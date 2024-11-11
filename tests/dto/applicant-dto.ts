export class ApplicantDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createApplicantWithValidRandomData(): ApplicantDto {
    return new ApplicantDto(
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * (89 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createApplicantWithIncomeBoundaryPosValueHighRisk(): ApplicantDto {
    return new ApplicantDto(1, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 3)
  }

  static createApplicantWithDeptBoundaryPosValueMediumRisk(): ApplicantDto {
    return new ApplicantDto(10, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 9)
  }

  static createApplicantWithAgeBoundaryPosValueLowRisk(): ApplicantDto {
    return new ApplicantDto(100, 0, 17, true, 1, 12)
  }

  static createApplicantWithNegativeIncomeValue(): ApplicantDto {
    return new ApplicantDto(
      -1,
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createApplicantWithIncorrectDebtValue(): ApplicantDto {
    return new ApplicantDto(
      Math.floor(Math.random() * 100 + 1),
      -1,
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createApplicantWithAgeBoundaryNegValue(): ApplicantDto {
    return new ApplicantDto(
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100),
      0,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }
}
