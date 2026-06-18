import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class DashboardPage extends BasePage{
 private readonly pimMenu: Locator;
 constructor(page: Page){
  super(page);
  this.pimMenu=page.locator('span').filter({hasText:'PIM'});
 }
 public async navigateToPIM():Promise<void>{
  await this.pimMenu.first().click();
 }
}