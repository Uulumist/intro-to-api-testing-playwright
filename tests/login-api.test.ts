import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'
const serviceUrl = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'

test.describe('Tallinn delivery api tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceUrl}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    console.log('Response body: ', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.post(`${serviceUrl}${loginPath}`, { data: requestBody })
    const responseBody = await response.text()
    console.log('Response body: ', responseBody)
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
