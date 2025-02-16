import { BasePage } from './base.page';
import { step } from '../fixtures/base.fixture';

export class ParaBankLoginPage extends BasePage {
    private readonly selectors = {
        usernameInput: "input[name='username']",
        passwordInput: "input[name='password']",
        loginButton: "input[value='Log In']",
        errorMessage: ".error"
    };

    @step()
    async login(username: string, password: string) {
        await this.page.fill(this.selectors.usernameInput, username);
        await this.page.fill(this.selectors.passwordInput, password);
        await this.page.click(this.selectors.loginButton);
    }

    @step()
    async getErrorMessage() {
        return this.page.textContent(this.selectors.errorMessage);
    }
}