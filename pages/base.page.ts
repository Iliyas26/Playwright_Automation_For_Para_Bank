import { Page } from '@playwright/test';
import { step } from '../fixtures/base.fixture';

export class BasePage {
    constructor(protected page: Page) {}

    @step()
    async navigate(url: string) {
        await this.page.goto(url);
    }

    @step()
    async validateElementVisible(selector: string) {
        await this.page.waitForSelector(selector);
        return this.page.isVisible(selector);
    }
}