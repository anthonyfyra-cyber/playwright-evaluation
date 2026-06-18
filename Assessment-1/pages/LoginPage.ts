import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class LoginPage extends BasePage{
 private readonly usernameInput: Locator;
 private readonly passwordInput: Locator;
 private readonly loginButton: Locator;
 private readonly errorMessage: Locator;
 constructor(page: Page){
  super(page);
  this.usernameInput=page.locator('input[name="username"]');
  this.passwordInput=page.locator('input[name="password"]');
  this.loginButton=page.locator('button[type="submit"]');
  this.errorMessage=page.locator('.oxd-alert-content-text');
 }
 public async goto():Promise<void>{await this.page.goto('/');}
 public async login(username:string,password:string):Promise<void>{
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
 }
 public async getErrorMessage():Promise<string>{
  return (await this.errorMessage.textContent()) ?? '';
 }
}