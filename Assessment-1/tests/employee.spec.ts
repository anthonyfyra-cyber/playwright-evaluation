import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('employee search and collect names', async ({page})=>{
 const login=new LoginPage(page);
 const dashboard=new DashboardPage(page);
 const employee=new EmployeeListPage(page);

 await login.goto();
 await login.login('Admin','admin123');

 await dashboard.navigateToPIM();

 const names:string[]=await employee.getEmployeeNames();

 console.log(`Employees Found: ${names.length}`);

 expect(names.length).toBeGreaterThan(0);

 for(const name of names){
   expect(name.trim()).not.toBe('');
 }
});