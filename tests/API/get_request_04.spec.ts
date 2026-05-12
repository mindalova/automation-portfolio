import {test, expect} from '@playwright/test';

test('Get Request 04 - booking by id - path parameter', async ({request}) => {

const bookingId = 3; //pass as path parameter

const response = await request.get(`/booking/${bookingId}`);

expect(response.status()).toBe(200);
const responseBody = await response.json();
console.log(responseBody);

console.log("1", response.headers());
console.log('2', response.json());
console.log('3', response.url());
console.log('4', response.statusText());
console.log('5', response.headersArray());
console.log('6', response.dispose)



/* expect(responseBody.firstname).toBe('Mark');
expect(responseBody.lastname).toBe('Ericsson');
expect(responseBody.totalprice).toBe(114);
expect(responseBody.depositpaid).toBe(true);
expect(responseBody.bookingdates.checkin).toBe('2021-03-18');
expect(responseBody.bookingdates.checkout).toBe('2021-04-15');
expect(responseBody.additionalneeds).toBe('Breakfast'); */

});

