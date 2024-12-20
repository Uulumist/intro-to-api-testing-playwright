import { expect, test } from '@playwright/test'
import { ApplicantDto } from './dto/applicant-dto'
import { StatusCodes } from 'http-status-codes'

const serviceUrl = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test.describe('tests for POST/loan-calc/decision', () => {
  test('Send call with all valid data, should receive code 200', async ({ request }) => {
    const requestBody = ApplicantDto.createApplicantWithValidRandomData()
    const response = await request.post(serviceUrl, { data: requestBody })
    const responseBody = await response.json()
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBeDefined()
    expect.soft(responseBody.riskPeriods).toBeDefined()
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with income boundary value and loanPeriod: 3, should receive riskLevel: High risk', async ({
    request,
  }) => {
    const requestBody = ApplicantDto.createApplicantWithIncomeBoundaryPosValueHighRisk()
    const response = await request.post(serviceUrl, { data: requestBody })
    const responseBody = await response.json()
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('High Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([3, 6]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with dept boundary value and loanPeriod: 9, should receive riskLevel: Medium risk', async ({
    request,
  }) => {
    const requestBody = ApplicantDto.createApplicantWithDeptBoundaryPosValueMediumRisk()
    const response = await request.post(serviceUrl, { data: requestBody })
    const responseBody = await response.json()
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([6, 9, 12]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with age boundary value and loanPeriod: 12, should receive riskLevel: Low risk', async ({
    request,
  }) => {
    const requestBody = ApplicantDto.createApplicantWithAgeBoundaryPosValueLowRisk()
    const response = await request.post(serviceUrl, { data: requestBody })
    const responseBody = await response.json()
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([12, 18, 24, 36]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call without request body should receive code 400', async ({ request }) => {
    const response = await request.post(serviceUrl)
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with negative income value, should receive code 400', async ({ request }) => {
    const requestBody = ApplicantDto.createApplicantWithNegativeIncomeValue()
    const response = await request.post(serviceUrl, { data: requestBody })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with incorrect debt boundary value, should receive code 400', async ({
    request,
  }) => {
    const requestBody = ApplicantDto.createApplicantWithIncorrectDebtValue()
    const response = await request.post(serviceUrl, { data: requestBody })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with incorrect age boundary value, should receive code 400', async ({
    request,
  }) => {
    const requestBody = ApplicantDto.createApplicantWithAgeBoundaryNegValue()
    const response = await request.post(serviceUrl, { data: requestBody })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})
