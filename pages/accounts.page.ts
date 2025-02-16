import { BasePage } from './base.page';
import { expect, step } from '../fixtures/base.fixture';

export class ParaBankAccountsPage extends BasePage {
    private readonly selectors = {
        accountTypeSelect: "#type",
        fromAccountId: "#fromAccountId",
        toAccountSelect: "#toAccountId",
        openNewAccountButton: "input.button[value='Open New Account']",
        newAccountId: "#newAccountId",
        accountsTable: "#accountTable",
        transferAmount: "#amount",
        transferButton: "input[value='Transfer']",
        balanceField: "td[class='balance']",
        accountOverview: "//a[normalize-space()='Accounts Overview']",
        accountOpeningError: ".error",
        loadingMessage: "#loading"
    };

    @step()
    async createNewAccount(accountType: 'CHECKING' | 'SAVINGS') {
        try {
            // Wait for the from account to be available
            await this.page.waitForSelector(this.selectors.fromAccountId, { state: 'visible', timeout: 10000 });
            
            // Get the first available account
            const fromAccount = await this.page.$eval(this.selectors.fromAccountId, (select: HTMLSelectElement) => select.value);
            
            // Select account type
            await this.page.waitForSelector(this.selectors.accountTypeSelect, { state: 'visible' });
            await this.page.selectOption(this.selectors.accountTypeSelect, accountType);
            
            await this.page.waitForTimeout(1000);
            // Wait for button to be visible and clickable
            await this.page.waitForSelector(this.selectors.openNewAccountButton, { 
                state: 'visible',
                timeout: 5000 
            });

            // Ensure the button is not disabled
            const button = await this.page.$(this.selectors.openNewAccountButton);
            const isDisabled = await button?.isDisabled();
            if (isDisabled) {
                throw new Error('Open New Account button is disabled');
            }

            // Click with force true and timeout
            await this.page.click(this.selectors.openNewAccountButton, {
                force: true,
                timeout: 5000
            });

            // Wait for new account ID to be visible
            await this.page.waitForSelector(this.selectors.newAccountId, {
                state: 'visible',
                timeout: 10000
            });

            // Get the new account number
            const accountNumber = await this.page.textContent(this.selectors.newAccountId);
            
            if (!accountNumber) {
                throw new Error('Failed to retrieve new account number');
            }

            return accountNumber;
        } catch (error) {
            // Check for specific error messages
            throw new Error('Failed to retrieve new account number - ' + error);
        }
    }

    @step()
    async validateAccountBalance(accountNumber: string) {
        try {
            await this.page.click(this.selectors.accountOverview);
            await this.page.waitForSelector(this.selectors.accountsTable, {
                state: 'visible',
                timeout: 5000
            });

            const balanceLocator = this.page.locator(`//tr[contains(., '${accountNumber}')]//td[contains(., '$')]`).nth(0);
            await balanceLocator.waitFor({ state: 'visible', timeout: 5000 });

            const balance = await balanceLocator.textContent();
            expect(balance).toBeTruthy();
            return true;
        } catch (error) {
            console.error(`Failed to validate balance for account ${accountNumber}:`, error);
            return false;
        }
    }

    @step()
    async waitForAccountsToLoad() {
        try {
            // Wait for loading message to disappear if present
            const loadingElement = await this.page.$(this.selectors.loadingMessage);
            if (loadingElement) {
                await this.page.waitForSelector(this.selectors.loadingMessage, {
                    state: 'hidden',
                    timeout: 10000
                });
            }

            // Wait for accounts table to be visible
            await this.page.waitForSelector(this.selectors.accountsTable, {
                state: 'visible',
                timeout: 10000
            });
        } catch (error) {
            throw new Error('Accounts failed to load: ' + error.message);
        }
    }

    @step()
    async transferFunds(fromAccount: string, amount: number) {
        try {
            await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
            await this.page.waitForSelector(this.selectors.fromAccountId, {
                state: 'visible',
                timeout: 5000
            });
            await this.page.selectOption(this.selectors.fromAccountId, fromAccount);
            await this.page.click(this.selectors.transferAmount);
            await this.page.fill(this.selectors.transferAmount, amount.toString());
            await this.page.click(this.selectors.transferButton);

            // Wait for success message or error
            const successMessage = await this.page.waitForSelector('text=Transfer Complete!', {
                timeout: 5000
            }).catch(() => null);

            if (!successMessage) {
                const errorMessage = await this.page.textContent('.error');
                throw new Error(`Transfer failed: ${errorMessage}`);
            }
        } catch (error) {
            throw new Error(`Failed to transfer funds: ${error.message}`);
        }
    }

    @step()
    async getAccountBalance(accountNumber: string): Promise<string> {
        const balanceLocator = this.page.locator(`//tr[contains(., '${accountNumber}')]//td[contains(@class, 'balance')]`);
        await balanceLocator.waitFor({ state: 'visible', timeout: 5000 });
        const balance = await balanceLocator.textContent();
        if (!balance) {
            throw new Error(`Could not find balance for account ${accountNumber}`);
        }
        return balance;
    }
}