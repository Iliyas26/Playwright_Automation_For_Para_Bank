import { test, expect } from '../../fixtures/base.fixture';

test.describe('User Registration, Login, and Account Management', () => {
  let registeredUser: { username: string; password: string } = { username: '', password: '' };
  let accountNumber: string;

  test('should register, login, and manage account', async ({ page, registrationPage, loginPage, homePage, accountsPage, billPayPage }) => {
    // Step 1: Register a new user
    await test.step('Navigate to registration page', async () => {
      await page.goto('/parabank/register.htm');
    });

    await test.step('Register new user', async () => {
      const username = await registrationPage.registerNewUser();

      let title = page.locator('.title');
      await expect(title).toBeVisible();
      await expect(title).toContainText(`Welcome ${username}`)
      registeredUser.username = username;
      registeredUser.password = 'Test@123';
    });

    await test.step('should log out correctly', async () => {
        let leftPanel = page.locator('#leftPanel li a');
        await leftPanel.filter({hasText: 'Log Out'}).click();
            
      //  expect(page).toHaveURL('/parabank/index.htm?ConnType=JDBC');

      //  let loginPanel = page.locator("#loginPanel");
      //  await expect(loginPanel).toBeVisible();
    });

    // Step 2: Login with the registered user
    await test.step('Navigate to login page', async () => {
      await page.goto('/parabank/index.htm');
    });
    await test.step('Login with credentials', async () => {
      if (!registeredUser) {
        throw new Error('Registered user is undefined');
      }
      await loginPage.login(registeredUser.username, registeredUser.password);
      await expect(page.locator('text=Accounts Overview').nth(0)).toBeVisible();
    });

    // Step 3: Manage account
    await test.step('Create savings account', async () => {
      await homePage.navigateToOpenNewAccount();
      const newAccountNumber = await accountsPage.createNewAccount('SAVINGS');
      if (newAccountNumber) {
        accountNumber = newAccountNumber;
        await expect(page.locator(`text=${accountNumber}`)).toBeVisible();
      } else {
        throw new Error('Failed to create a new savings account');
      }
    });

    await test.step('Validate account balance', async () => {
      await accountsPage.validateAccountBalance(accountNumber);
    });

    await test.step('Transfer funds', async () => {
      const amount = 100;
      await accountsPage.transferFunds(accountNumber, amount);
      await expect(page.locator('text=Transfer Complete!')).toBeVisible();
    });

    await test.step('Bill payment', async () => {
      await homePage.navigateToBillPay();
      await billPayPage.payBill({
          name: 'Test Payee',
          address: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          phone: '1234567890',
          account: '123456789',
          amount: 10,
          fromAccount: accountNumber
      });
      await billPayPage.verifyPaymentSuccess();
    });
  });
});