export class ApplicantDto {
  income: number
  dept: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    dept: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.dept = dept
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createApplicantWithValidRandomData(): ApplicantDto {
    return new ApplicantDto(
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createApplicantWithIncomeHighRisk(): ApplicantDto {
    return new ApplicantDto(1, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 3)
  }

  static createApplicantWithDeptMediumRisk(): ApplicantDto {
    return new ApplicantDto(10, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 9)
  }

  static createApplicantWithAgeLowRisk(): ApplicantDto {
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

  static createApplicantWithIncorrectDeptValue(): ApplicantDto {
    return new ApplicantDto(
      Math.floor(Math.random() * 100 + 1),
      -1,
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }
}
