import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage{
 private readonly employeeNameInput: Locator;
 private readonly searchButton: Locator;
 private readonly tableRows: Locator;

 constructor(page: Page){
  super(page);
  this.employeeNameInput=page.locator('input[placeholder="Type for hints..."]').first();
  this.searchButton=page.getByRole('button',{name:'Search'});
  this.tableRows=page.locator('.oxd-table-body .oxd-table-row');
 }

 public async waitForEmployeeTable():Promise<void>{
  await this.page.waitForLoadState('networkidle');
  await this.tableRows.first().waitFor({timeout:15000});
 }

 public async searchEmployee(employeeName:string):Promise<void>{
  await this.employeeNameInput.click();
  await this.employeeNameInput.pressSequentially(employeeName,{delay:100});
  const option: Locator=this.page.locator('.oxd-autocomplete-option').first();
  if(await option.count()>0){
   await option.click();
   await this.searchButton.click();
  }
 }

 public async getEmployeeNames():Promise<string[]>{
  await this.waitForEmployeeTable();
  const names:string[]=[];
  const count:number=await this.tableRows.count();
  for(let i:number=0;i<count;i++){
    const text:string=((await this.tableRows.nth(i).textContent()) ?? '').trim();
    names.push(text);
  }
  return names;
 }
}