import {test, expect} from '@playwright/test';

test('Get Request 04 - booking by id - path parameter', async ({request}) => {

const bookingId = 3; //pass as path parameter

await request.get()

});

