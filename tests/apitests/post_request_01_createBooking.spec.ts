/*
Create a new booking
Validate the response
Validate the response body
Validate the response headers
Validate the response status code
Validate the response time
Validate the response body
Validate the response headers
Validate the response status code
Validate the response time
*/

import { test, expect } from '@playwright/test';
//import { apiRequest } from '../utils/apiRequest';

test('Create a new booking Post Request', async ({ request }) => {
  // request body
  const requestBody = {
    firstname: 'Bon3',
    lastname: 'Jovi3',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-01',
      checkout: '2027-01-01',
    },
    additionalneeds: 'Breakfast',
  };

  // send post request
  const response = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: requestBody,
    },
  );

  const responseBody = await response.json();

  console.log(responseBody);

  // validate status
  expect(response.status()).toBe(200);

  // validate response
  expect(responseBody.bookingid).toBeDefined();
  expect(responseBody).toHaveProperty('bookingid');
  expect(responseBody.booking.firstname).toBe(requestBody.firstname);
  expect(responseBody.booking.lastname).toBe(requestBody.lastname);
  expect(responseBody.booking.totalprice).toBe(requestBody.totalprice);
  expect(responseBody.booking.depositpaid).toBe(requestBody.depositpaid);
  expect(responseBody.booking.bookingdates.checkin).toBe(
    requestBody.bookingdates.checkin,
  );
  expect(responseBody.booking.bookingdates.checkout).toBe(
    requestBody.bookingdates.checkout,
  );
  expect(responseBody.booking.additionalneeds).toBe(
    requestBody.additionalneeds,
  );
});
