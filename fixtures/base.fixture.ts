import { test as base, Page, BrowserContext } from '@playwright/test';
import { ParaBankHomePage } from '../pages/home.page';
import { ParaBankLoginPage } from '../pages/login.page';
import { ParaBankRegistrationPage } from '../pages/registration.page';
import { ParaBankAccountsPage } from '../pages/accounts.page';
import { ParaBankBillPayPage } from '../pages/billpay.page';

// Interface for ParaBank fixture
export interface ParaBankFixture {
    context: BrowserContext;
    page: Page;
    homePage: ParaBankHomePage;
    loginPage: ParaBankLoginPage;
    registrationPage: ParaBankRegistrationPage;
    accountsPage: ParaBankAccountsPage;
    billPayPage: ParaBankBillPayPage;
    registeredUser?: { username: string; password: string };
}

// Extend base test with ParaBank fixture
export const test = base.extend<ParaBankFixture>({
    context: async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
    },
    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
        await page.close();
    },
    homePage: async ({ page }, use) => {
        await use(new ParaBankHomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new ParaBankLoginPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new ParaBankRegistrationPage(page));
    },
    accountsPage: async ({ page }, use) => {
        await use(new ParaBankAccountsPage(page));
    },
    billPayPage: async ({ page }, use) => {
        await use(new ParaBankBillPayPage(page));
    },
    registeredUser: undefined,
});

export { expect } from '@playwright/test';

// Step decorator for test steps
export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMemberDecoratorContext
    ) {
        return function replacementMethod(...args: any) {
            const name = `${stepName || context.name as string}`;
            return test.step(name, async () => {
                return await target.call(this, ...args);
            });
        };
    };
}