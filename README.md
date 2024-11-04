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
