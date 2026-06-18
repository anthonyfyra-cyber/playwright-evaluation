import { request, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export interface AuthResponse {
  token: string;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: Booking;
}

export class ApiUtils {
  private static async getContext(): Promise<APIRequestContext> {
    return request.newContext({ baseURL: BASE_URL });
  }

  static async getToken(): Promise<string> {
    const ctx = await this.getContext();
    const response = await ctx.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    const body: AuthResponse = await response.json();
    return body.token;
  }

  static async createBooking(): Promise<{ token: string; bookingid: number }> {
    const ctx = await this.getContext();
    const token = await this.getToken();

    const response = await ctx.post('/booking', {
      data: {
        firstname: 'Anthony',
        lastname: 'Tester',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-10'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const body: CreateBookingResponse = await response.json();

    return { token, bookingid: body.bookingid };
  }
}