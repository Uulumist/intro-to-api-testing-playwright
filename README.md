Checklist for testing POST/loan-calc/decision

| Scenario | Test data |
| ------------- | ------------- |
| **Positive cases  for request body**  |
| Send call with all correct values | "income": >0,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36  |
| Send call with income boundary value | "income": 1,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Send call with dept boundary value | "income": >0,"debt": 0,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Send call with age boundary value | "income": >0,"debt": >-1,"age": 17,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| **Positive cases  for response body**  |
| Check that riskScore is defined | "income": >0,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36  |
| Check that riskLevel is defined | "income": >0,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Check that riskLevel is 'High Risk' with loan period 3 | "income": 100,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3 |
| Check that riskLevel is 'Medium Risk' with loan period 9 | "income": 100,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 9 |
| Check that riskLevel is 'Low Risk' with loan period 12 | "income": 100,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 12 |
| **Negative cases**  |
| Send call with no body | |
| Send call with incorrect income boundary value  | "income": 0,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Send call with negative income value  | "income": -1,"debt": >-1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Send call with incorrect dept boundary value  | "income": >0,"debt": -1,"age": 17..90,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |
| Send call with incorrect age boundary value  | "income": >0,"debt": >-1,"age": 16,"employed": true,"loanAmount": >0,"loanPeriod": 3..36 |

Checklist for testing GET, PUT, DELETE /test-orders

| Scenario | Test data |
| ------------- | ------------- |
| Get order with correct id | {1..10}  |
| Get order with incorrect id  | <1, >10  |
| Get order with symbol id  | abc  |
| Update order with correct id | {1..10}  |
| Update order with incorrect id  | <1, >10  |
| Update order with symbol id  | abc  |
| PUT call with invalid api key  | 123  |
| Delete order with correct id | {1..10}  |
| Delete order with incorrect id  | <1, >10  |
| Delete order with symbol id  | abc  |
| DELETE call with invalid api key  | 123  |
