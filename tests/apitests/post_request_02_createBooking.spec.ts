/*
Create a new booking
Request body from JSON file
Request type is POST
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Create a new booking Post Request using JSON file', async ({ request }) => {
  // request body
 
  const requestBody = JSON.parse(fs.readFileSync('testdata/postRequest.json', 'utf-8'));
console.log(requestBody);

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
