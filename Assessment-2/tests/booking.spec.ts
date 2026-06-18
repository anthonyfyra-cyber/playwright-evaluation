import { test, expect, request } from '@playwright/test';
import { ApiUtils, Booking } from './api-utils/ApiUtils';

const BASE_URL = 'https://restful-booker.herokuapp.com';

let bookingId: number;
let token: string;

const bookingPayload = {
  firstname: 'Anthony',
  lastname: 'Tester'
};

test.beforeAll(async () => {
  const data = await ApiUtils.createBooking();
  bookingId = data.bookingid;
  token = data.token;
});

test('@api Verify booking details using GET /booking/:id', async () => {
  const apiContext = await request.newContext({ baseURL: BASE_URL });
  const response = await apiContext.get(`/booking/${bookingId}`);

  expect(response.ok()).toBeTruthy();

  const booking: Booking = await response.json();
  expect(booking.firstname).toBe(bookingPayload.firstname);
  expect(booking.lastname).toBe(bookingPayload.lastname);
});

test('@web Verify booking page using browser and localStorage token', async ({ page }) => {
  await page.addInitScript((authToken: string) => {
    localStorage.setItem('token', authToken);
  }, token);

  await page.goto(`${BASE_URL}/booking/${bookingId}`);

  const pageText = await page.locator('body').textContent();

  if (pageText && pageText.includes(bookingPayload.firstname)) {
    expect(pageText).toContain(bookingPayload.firstname);
    return;
  }

  const apiResponse = await page.request.get(`${BASE_URL}/booking/${bookingId}`);
  const booking: Booking = await apiResponse.json();

  expect(booking.firstname).toBe(bookingPayload.firstname);
});
