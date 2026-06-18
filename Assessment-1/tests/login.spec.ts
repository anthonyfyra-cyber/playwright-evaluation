import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('@smoke successful login', async ({page})=>{
 const login=new LoginPage(page);
 await login.goto();
 await login.login('Admin','admin123');
 await expect(page).toHaveURL(/dashboard/);
});

test('failed login with wrong password', async ({page})=>{
 const login=new LoginPage(page);
 await login.goto();
 await login.login('Admin','wrongPassword');
 await expect.poll(async()=>await login.getErrorMessage()).toContain('Invalid');
});