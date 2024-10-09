import { test, expect } from '@playwright/test';

test.describe('Backend tests', ()=> {
  test('Get all posts', async ({ request }) => {
    const response = await request.get('http://localhost:3000/posts');
    expect(response.ok()).toBeTruthy()

  });



})  