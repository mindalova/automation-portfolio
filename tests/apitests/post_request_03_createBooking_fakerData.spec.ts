/*
Create a new booking
Request body is random datafrom faker library
Request type is POST
*/

import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/randomDataGenerator';

test('Create a new booking Post Request using random data from faker library', async ({ request }) => {
  // request body
  const requestBody = {
    firstname: RandomDataUtil.getFirstName(),
    lastname: RandomDataUtil.getlastName(),
    totalprice: RandomDataUtil.getRandomPrice(100, 1000),
    depositpaid: RandomDataUtil.getRandomBoolean(),
    bookingdates: {
      checkin: RandomDataUtil.getRandomDate(),
      checkout: RandomDataUtil.getRandomDate(),
    },
    additionalneeds: RandomDataUtil.getRandomString(10),
  };
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
