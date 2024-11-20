import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test.describe('Tallinn delivery api tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    console.log('Response body: ', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, { data: requestBody })
    const responseBody = await response.text()
    console.log('Response body: ', responseBody)
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('login and create order', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const jwt = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const orderResponseBody = await orderResponse.json()
    console.log('orderResponse status:', orderResponse.status())
    console.log('orderResponse:', orderResponseBody)
    expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
    expect.soft(orderResponseBody.status).toBe('OPEN')
    expect.soft(orderResponseBody.id).toBeDefined()
  })

  test('login and get order by id', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const jwt = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const orderResponseBody = await orderResponse.json()
    console.log(orderResponseBody)
    const orderId = orderResponseBody.id
    const getOrderByIdResponse = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const getOrderByIdResponseBody = await getOrderByIdResponse.json()

    console.log('getOrderByIdResponse status:', getOrderByIdResponse.status())
    console.log('getOrderByIdResponse:', getOrderByIdResponse)
    console.log(getOrderByIdResponseBody)
    expect.soft(getOrderByIdResponse.status()).toBe(StatusCodes.OK)
    expect.soft(getOrderByIdResponseBody.status).toBe('OPEN')
    expect.soft(getOrderByIdResponseBody.id).toBe(orderId)
  })

  test('login and delete order by id', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const jwt = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const orderResponseBody = await orderResponse.json()
    console.log(orderResponseBody)
    const orderId = orderResponseBody.id
    const deleteOrderByIdResponse = await request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const deleteOrderByIdResponseBody = await deleteOrderByIdResponse.text()
    console.log('getOrderByIdResponse status:', deleteOrderByIdResponse.status())
    console.log('getOrderByIdResponse:', deleteOrderByIdResponse)
    expect.soft(deleteOrderByIdResponse.status()).toBe(StatusCodes.OK)
    expect.soft(deleteOrderByIdResponseBody).toBe('true')
  })
})
