import { BasePage } from './base.page';
import { step } from '../fixtures/base.fixture';
import { RandomGenerator } from '../utils/random-generator';

export class ParaBankRegistrationPage extends BasePage {
    private readonly selectors = {
        firstName: "input[name='customer.firstName']",
        lastName: "input[name='customer.lastName']",
        address: "input[name='customer.address.street']",
        city: "input[name='customer.address.city']",
        state: "input[name='customer.address.state']",
        zipCode: "input[name='customer.address.zipCode']",
        phone: "input[name='customer.phoneNumber']",
        ssn: "input[name='customer.ssn']",
        username: "input[name='customer.username']",
        password: "input[name='customer.password']",
        confirmPassword: "input[name='repeatedPassword']",
        registerButton: "input[value='Register']"
    };

    @step()
    async registerNewUser() {
        // Generate a random username and fill in the registration form
        const username = RandomGenerator.generateUsername();
        await this.page.fill(this.selectors.firstName, 'Test');
        await this.page.fill(this.selectors.lastName, 'User');
        await this.page.fill(this.selectors.address, '123 Test St');
        await this.page.fill(this.selectors.city, 'Test City');
        await this.page.fill(this.selectors.state, 'TS');
        await this.page.fill(this.selectors.zipCode, '12345');
        await this.page.fill(this.selectors.phone, '1234567890');
        await this.page.fill(this.selectors.ssn, '123-45-6789');
        await this.page.fill(this.selectors.username, username);
        await this.page.fill(this.selectors.password, 'Test@123');
        await this.page.fill(this.selectors.confirmPassword, 'Test@123');
        await this.page.click(this.selectors.registerButton);
        return username; // Return the generated username
    }
}