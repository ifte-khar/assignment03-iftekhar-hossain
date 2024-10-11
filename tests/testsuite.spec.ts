import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {
  test('log In and Create a Client', async ({ page }) => {
    await page.goto('http://localhost:3000');


    //Log in funtion
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();

    //Assertion
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    
    await page.locator('#app > div > div > div:nth-child(2) > a').click();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: 'Create Client' }).click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('iftekhar');
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('iftekhar@gmail.com');
    await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill('0793131704');
    await page.getByText('Save').click();
    await page.waitForURL('http://localhost:3000/clients');
    await expect(page.url()).toBe('http://localhost:3000/clients');
    await expect(page.getByRole('link', { name: 'Tester Hotel' })).toBeVisible();
  });
});


test.describe('Backend tests', () => {
  test('Log in and get all clients', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data:{
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }      
    });
    expect (response.ok()).toBeTruthy();
    const responseBody = await response.json();
    const authToken = responseBody.token;
    console.log(`Authentication token: ${authToken}`);
    expect(authToken).toBeTruthy();
    
    console.log(`Authentication token: ${authToken}`);
    const getClientsResponse = await request.get('http://localhost:3000/api/clients', {
      headers: {
        "content-type": "application/json",
        'x-user-auth': `{"username":"tester01","token":"${authToken}"}`
      }
    });
    expect(getClientsResponse.ok()).toBeTruthy();

  });  
});