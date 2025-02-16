import { Page } from '@playwright/test';
import { step } from '../fixtures/base.fixture';

export class BasePage {
    constructor(protected page: Page) {}

    @step()
    async navigate(url: string) {
        // Navigate to the specified URL
        await this.page.goto(url);
    }

    @step()
    async validateElementVisible(selector: string) {
        // Wait for the specified element to be visible
        await this.page.waitForSelector(selector);
        return this.page.isVisible(selector);
    }
}