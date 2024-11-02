import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = OrderDto.createOrderWithRandomData()
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  const responseBody= await response.json()
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.courierId).toBeDefined()
  expect.soft(responseBody.customerName).toBeDefined()
  expect.soft(responseBody.customerPhone).toBe('+123456789')
  expect.soft(responseBody.comment).toBe('Urgent order')
  expect.soft(responseBody.id).toBeDefined()
})
