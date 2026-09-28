# Database Design

## Database

The application will use SQLite as its relational database.

SQLite is suitable for the assessment because the expected dataset is approximately 10,000 employees, it requires minimal operational setup, and it satisfies the requirement for a relational database.

## Employee Entity

The initial employee model contains the following fields:

| Field        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| id           | Internal database identifier                                  |
| employeeId   | Organization-specific unique employee identifier              |
| firstName    | Employee's first name                                         |
| lastName     | Employee's last name                                          |
| email        | Employee's unique email address                               |
| department   | Department in which the employee works                        |
| designation  | Employee's job title/designation                              |
| country      | Employee's country                                            |
| currency     | ISO-style currency code associated with the employee's salary |
| annualSalary | Current annual salary amount                                  |
| joiningDate  | Date the employee joined the organization                     |
| createdAt    | Timestamp when the record was created                         |
| updatedAt    | Timestamp when the record was last updated                    |

## Constraints

* `id` will be the primary key.
* `employeeId` must be unique.
* `email` must be unique.
* Required employee and salary attributes must not be null.
* Salary must be stored as a numeric value so that aggregation and comparison operations can be performed efficiently.

## Current Salary Assumption

Until clarified by the product owner, `annualSalary` represents the employee's current annual base salary in the currency stored in the `currency` field.

Salary history and compensation components such as bonuses, allowances, and equity are not included in the initial model.

The model will be revised if clarification changes these requirements.
