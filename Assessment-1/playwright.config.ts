import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 retries:2,
 reporter:[['html']],
 use:{
  baseURL:'https://opensource-demo.orangehrmlive.com',
  screenshot:'only-on-failure',
  trace:'retain-on-failure'
 }
});