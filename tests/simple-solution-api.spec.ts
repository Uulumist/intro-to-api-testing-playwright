import { APIResponse, expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

test.describe('Tests for GET/test-orders method', () => {
  test('get order with correct id should receive code 200', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 200
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('get order with incorrect id should receive code 400', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('get order with symbol id should receive code 400', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/a')
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})

test.describe('Tests for PUT/test-orders method', () => {
  test('update order with correct id should receive code 200', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    const requestBody = OrderDto.createOrderWithRandomData()
    // Build and send a PUT request to the server
    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/2',
      { headers: requestHeaders, data: requestBody },
    )
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 200
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('update order with incorrect id should receive code 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    const requestBody = OrderDto.createOrderWithRandomData()
    // Build and send a PUT request to the server
    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/11',
      { headers: requestHeaders, data: requestBody },
    )
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('update order with symbol id should receive code 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    const requestBody = OrderDto.createOrderWithRandomData()
    // Build and send a PUT request to the server
    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/abc',
      { headers: requestHeaders, data: requestBody },
    )
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('update order with invalid api key should receive code 401', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '123',
    }
    const requestBody = OrderDto.createOrderWithRandomData()
    // Build and send a PUT request to the server
    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/2',
      { headers: requestHeaders, data: requestBody },
    )
    // Log the response status, body and headers
    console.log('response headers:', response.headers())
    // Check if the response status is 401
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})

test.describe('Tests for DELETE/test-orders method', () => {
  test('delete order with correct id should receive code 204', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    // Build and send a DELETE request to the server
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/2',
      { headers: requestHeaders },
    )
    // Log the response status, body and headers
    console.log('response headers:', response.headers())
    // Check if the response status is 204
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('delete order with incorrect id should receive code 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    // Build and send a DELETE request to the server
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/11',
      { headers: requestHeaders },
    )
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('delete order with symbol id should receive code 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }
    // Build and send a DELETE request to the server
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/abc',
      { headers: requestHeaders },
    )
    // Log the response status, body and headers
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    // Check if the response status is 400
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('delete order with invalid api key should receive code 401', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '123',
    }
    // Build and send a DELETE request to the server
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/2',
      { headers: requestHeaders },
    )
    // Log the response status, body and headers
    console.log('response headers:', response.headers())
    // Check if the response status is 401
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
