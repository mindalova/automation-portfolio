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
import { apiRequest } from '../utils/apiRequest';

test ("Create a new booking Post Request", async ({ request }) => {

   // request body
    const requestBody = {
        "firstname": "Bon",
        "lastname": "Jovi",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2027-01-01"
        },
        "additionalneeds": "Breakfast"
    }

    // send post request

});