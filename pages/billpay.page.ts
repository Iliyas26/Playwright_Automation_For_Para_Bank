import { BasePage } from './base.page';
import { step } from '../fixtures/base.fixture';

interface PayeeInfo {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    account: string;
    amount: number;
    fromAccount: string;
}

export class ParaBankBillPayPage extends BasePage {
    private readonly selectors = {
        payeeName: "input[name='payee.name']",
        address: "input[name='payee.address.street']",
        city: "input[name='payee.address.city']",
        state: "input[name='payee.address.state']",
        zipCode: "input[name='payee.address.zipCode']",
        phone: "input[name='payee.phoneNumber']",
        account: "input[name='payee.accountNumber']",
        verifyAccount: "input[name='verifyAccount']",
        amount: "input[name='amount']",
        fromAccount: "select[name='fromAccountId']",
        sendPaymentButton: "input[value='Send Payment']",
        successMessage: "text=Bill Payment Complete"
    };

    @step()
    async payBill(payeeInfo: PayeeInfo) {
        await this.page.fill(this.selectors.payeeName, payeeInfo.name);
        await this.page.fill(this.selectors.address, payeeInfo.address);
        await this.page.fill(this.selectors.city, payeeInfo.city);
        await this.page.fill(this.selectors.state, payeeInfo.state);
        await this.page.fill(this.selectors.zipCode, payeeInfo.zipCode);
        await this.page.fill(this.selectors.phone, payeeInfo.phone);
        await this.page.fill(this.selectors.account, payeeInfo.account);
        await this.page.fill(this.selectors.verifyAccount, payeeInfo.account);
        await this.page.fill(this.selectors.amount, payeeInfo.amount.toString());
        await this.page.selectOption(this.selectors.fromAccount, payeeInfo.fromAccount);
        await this.page.click(this.selectors.sendPaymentButton);
    }

    @step()
    async verifyPaymentSuccess() {
        await this.page.waitForSelector(this.selectors.successMessage);
        return this.page.isVisible(this.selectors.successMessage);
    }
}