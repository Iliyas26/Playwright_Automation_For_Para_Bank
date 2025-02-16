import { test, expect } from '@playwright/test';
import { parseStringPromise } from 'xml2js';

test.describe('Transactions API', () => {
  const baseUrl = 'https://parabank.parasoft.com/parabank/services';

  test('should find transactions by amount', async ({ request }) => {
    const accountId = '12345'; // This should be dynamically generated in a real scenario
    const amount = 100;

    const response = await request.get(
      `${baseUrl}/bank/accounts/${accountId}/transactions/amount/${amount}`
    );

    expect(response.ok()).toBeTruthy();
    const xml = await response.text(); // Get the response as text
    const result = await parseStringPromise(xml); // Parse the XML

    const transactions = result.transactions.transaction; // Access the transactions

    expect(Array.isArray(transactions)).toBeTruthy();

    if (transactions.length > 0) {
      expect(transactions[0].amount[0]).toBe(amount.toFixed(2));
      expect(transactions[0]).toHaveProperty('description');
      expect(transactions[0]).toHaveProperty('type');
    }
  });

  test('should get account details', async ({ request }) => {
    const accountId = '12345'; // This should be dynamically generated in a real scenario

    const response = await request.get(
      `${baseUrl}/bank/accounts/${accountId}`
    );

    expect(response.ok()).toBeTruthy();
    const xml = await response.text(); // Get the response as text
    const accountDetails = await parseStringPromise(xml); // Parse the XML

    expect(accountDetails).toHaveProperty('account');
    expect(accountDetails.account).toHaveProperty('id');
    expect(accountDetails.account).toHaveProperty('balance');
    expect(accountDetails.account).toHaveProperty('type');

    expect(accountDetails.account.id[0]).toBe(accountId);
    expect(accountDetails.account.balance[0]).toBe('-2300.00');
    expect(accountDetails.account.type[0]).toBe('CHECKING');
  });
});