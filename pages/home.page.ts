import { BasePage } from './base.page';
import { step } from '../fixtures/base.fixture';

export class ParaBankHomePage extends BasePage {
    private readonly menuItems = {
        openNewAccount: "//a[text()='Open New Account']",
        accountsOverview: "//a[text()='Accounts Overview']",
        transferFunds: "//a[text()='Transfer Funds']",
        billPay: "//a[text()='Bill Pay']"
    };

    @step()
    async validateGlobalNavigation() {
        // Validate that all menu items are visible
        for (const [key, selector] of Object.entries(this.menuItems)) {
            const isVisible = await this.validateElementVisible(selector);
            if (!isVisible) throw new Error(`Menu item ${key} is not visible`);
        }
    }

    @step()
    async navigateToOpenNewAccount() {
        // Navigate to the Open New Account page
        await this.page.click(this.menuItems.openNewAccount);
    }

    @step()
    async navigateToBillPay() {
        // Navigate to the Bill Pay page
        await this.page.click(this.menuItems.billPay);
    }
}