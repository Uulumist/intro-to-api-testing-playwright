import { expect, test } from '@playwright/test'
import { ApiClient } from './api/api-client'

test.describe('Tallinn delivery api tests', () => {
  test('login and create order', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    console.log('orderId:', orderId)
  })

  test('login and get order by id', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const getOrderByIdResponse = await apiClient.getOrderById(orderId)
    expect.soft(getOrderByIdResponse.status).toBe('OPEN')
    expect.soft(getOrderByIdResponse.id).toBe(orderId)
  })

  test('login and delete order by id', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const deleteOrderByIdResponse = await apiClient.deleteOrderById(orderId)
    expect.soft(deleteOrderByIdResponse).toBe(true)
  })
})
