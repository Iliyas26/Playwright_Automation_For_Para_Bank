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
        // Fill in the username and password fields and click the login button
        await this.page.fill(this.selectors.usernameInput, username);
        await this.page.fill(this.selectors.passwordInput, password);
        await this.page.click(this.selectors.loginButton);
    }

    @step()
    async getErrorMessage() {
        // Retrieve the error message displayed on the login page
        return this.page.textContent(this.selectors.errorMessage);
    }
}