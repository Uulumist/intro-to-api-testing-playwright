import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const serviceUrl = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const jwtRegularExp = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

test.describe('Tallinn delivery api tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceUrl}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    expect(response.status()).toBe(StatusCodes.OK)
    expect(responseBody).toMatch(jwtRegularExp)
  })

  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.post(`${serviceUrl}${loginPath}`, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('login with incorrect HTTP method', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.get(`${serviceUrl}${loginPath}`, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })
})
