import { BasePage } from './base.page';
import { step } from '../fixtures/base.fixture';

export class ParaBankTransactionsPage extends BasePage {
    private readonly selectors = {
        accountSelect: "#accountId",
        findByAmountInput: "#criteria.amount",
        findTransactionsButton: "button[ng-click='criteria.searchType = 'AMOUNT''",
        transactionsTable: "#transactionTable",
        transactionRows: "#transactionTable tbody tr",
        dateRange: {
            fromDate: "#criteria.fromDate",
            toDate: "#criteria.toDate"
        }
    };

    @step()
    async findTransactionsByAmount(amount: number) {
        await this.page.fill(this.selectors.findByAmountInput, amount.toString());
        await this.page.click(this.selectors.findTransactionsButton);
        await this.page.waitForSelector(this.selectors.transactionsTable);
    }

    @step()
    async getTransactionsList() {
        const transactions = await this.page.$$(this.selectors.transactionRows);
        return Promise.all(
            transactions.map(async (row) => ({
                date: await row.$eval('td:nth-child(1)', el => el.textContent),
                amount: await row.$eval('td:nth-child(3)', el => el.textContent),
                type: await row.$eval('td:nth-child(4)', el => el.textContent)
            }))
        );
    }

    @step()
    async findTransactionsByDateRange(fromDate: string, toDate: string) {
        await this.page.fill(this.selectors.dateRange.fromDate, fromDate);
        await this.page.fill(this.selectors.dateRange.toDate, toDate);
        await this.page.click(this.selectors.findTransactionsButton);
    }
}