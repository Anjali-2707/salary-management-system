# Engineering Tradeoffs

This document records important product and engineering decisions made while building the Salary Management System.

The goal was to keep the solution appropriate for the current requirement of approximately 10,000 employees while leaving clear paths for future extension.

---

## 1. JavaScript instead of TypeScript

### Decision

The application uses JavaScript for both:

- React frontend
- Node.js / Express backend

### Reasoning

JavaScript was selected for implementation speed and familiarity.

The codebase compensates for the lack of compile-time type checking through:

- clear module boundaries
- backend validation
- automated tests
- predictable API contracts
- consistent naming conventions

### Tradeoff

TypeScript would provide stronger compile-time safety, particularly around:

- API response shapes
- employee models
- component props
- service interfaces

For a larger or longer-lived production codebase, TypeScript would be a reasonable next step.

---

## 2. SQLite instead of PostgreSQL

### Decision

SQLite is used as the relational database.

### Reasoning

The stated dataset is approximately:

```text
10,000 employees
```

For this scale and the current single-application use case, SQLite provides:

- relational constraints
- SQL aggregation
- simple deployment
- low operational overhead
- deterministic local development

### Tradeoff

SQLite is not intended to replace a full database server for every production environment.

If the application required:

- many concurrent writers
- horizontal backend scaling
- advanced access control
- high availability
- large-scale reporting

a database such as PostgreSQL would be more appropriate.

The repository layer isolates SQL access so this migration would not require rewriting the entire application.

---

## 3. Current salary instead of salary history

### Decision

The employee table stores the employee's current annual salary:

```text
annual_salary
```

### Reasoning

The initial requirements did not clearly establish whether historical salary changes must be tracked.

Implementing salary history prematurely would introduce additional concepts such as:

```text
effective_from
effective_to
salary changes
historical reporting
```

without confirmed product requirements.

### Tradeoff

The system cannot currently answer historical questions such as:

```text
What was this employee's salary last year?
```

or:

```text
How has Engineering compensation changed over time?
```

### Future extension

A dedicated table could be introduced:

```text
salary_history
```

with fields such as:

```text
id
employee_id
annual_salary
currency
effective_from
effective_to
created_at
```

---

## 4. Hard delete instead of soft delete

### Decision

Deleting an employee currently removes the database row.

### Reasoning

The existing API implements straightforward CRUD behavior and the retention requirements are not yet confirmed.

### Tradeoff

A deleted employee cannot currently be recovered from the application.

For production HR software this may not be sufficient because employee and compensation information may require retention or auditing.

### Future extension

Possible approaches include:

```text
active
deleted_at
deleted_by
```

and filtering inactive employees from normal employee lists.

---

## 5. No organization-wide cross-currency payroll total

### Decision

Salary analytics remain separated by currency.

For example:

```text
INR
USD
GBP
EUR
```

are calculated independently.

### Reasoning

This would not be meaningful:

```text
INR 1,500,000
+
USD 100,000
+
GBP 70,000
```

without an agreed currency-conversion policy.

Exchange-rate calculations require product decisions such as:

- reporting currency
- exchange-rate provider
- effective date
- historical vs current exchange rate
- refresh frequency

### Tradeoff

The dashboard cannot currently show a single global payroll number.

### Future extension

If the product defines a reporting currency, the system can add normalized salary values while retaining the original local salary and currency.

---

## 6. Server-side pagination instead of frontend pagination

### Decision

Employee pagination, searching, filtering and sorting are performed by the backend and SQLite.

### Reasoning

The application contains approximately 10,000 employees.

Loading every employee into the browser would:

- transfer unnecessary data
- increase frontend memory usage
- make sorting/filtering dependent on the downloaded dataset
- scale poorly as employee count grows

The frontend therefore requests only the current page.

Example:

```text
GET /api/employees?page=3&limit=20
```

### Tradeoff

The UI requires an API request whenever page, filter, search or sorting state changes.

This is preferable to downloading the complete dataset.

---

## 7. REST API instead of GraphQL

### Decision

The backend exposes REST endpoints.

Examples:

```text
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

### Reasoning

The application's resource model and data requirements are straightforward.

REST provides:

- simple HTTP semantics
- easy debugging
- simple Postman testing
- low infrastructure complexity

### Tradeoff

If the frontend later requires many highly customizable nested queries, GraphQL could reduce over-fetching or endpoint growth.

That complexity is not currently justified.

---

## 8. PUT instead of PATCH for employee updates

### Decision

Employee updates use:

```text
PUT /api/employees/:id
```

and the frontend sends the complete editable employee object.

### Reasoning

The edit form already contains all current employee fields, making a full update straightforward.

### Tradeoff

Small changes still transmit all employee fields.

A future API could introduce:

```text
PATCH /api/employees/:id
```

for partial updates if external integrations or more granular workflows require it.

---

## 9. Backend validation is authoritative

### Decision

Validation exists on both frontend and backend, but backend validation is treated as authoritative.

### Reasoning

Frontend validation can be bypassed by:

- Postman
- curl
- scripts
- another frontend
- direct HTTP clients

The backend therefore validates:

- required fields
- email shape
- currency-code shape
- salary values
- joining dates
- pagination values
- sorting fields

### Tradeoff

Some validation logic may appear in both frontend and backend.

This duplication is intentional because the two layers have different responsibilities:

```text
Frontend
→ user experience

Backend
→ data integrity
```

---

## 10. Material UI instead of fully custom CSS

### Decision

Material UI is used for the frontend component system.

### Reasoning

It provides established components for:

- forms
- tables
- dialogs
- buttons
- navigation
- loading states
- alerts
- responsive layouts

This allows development effort to focus on salary-management functionality instead of recreating generic UI primitives.

### Tradeoff

The application inherits Material UI conventions and adds a frontend dependency.

A highly custom branded product might eventually require a more specialized design system.

---

## 11. Layered backend architecture

### Decision

The backend is separated into:

```text
Route
Controller
Service
Repository
Database
```

### Reasoning

This creates clear responsibilities:

```text
Route
→ endpoint definition

Controller
→ HTTP concerns

Service
→ application logic

Repository
→ database queries
```

### Tradeoff

For a very small application this introduces more files than placing everything in one Express route.

The additional structure was chosen because the project already includes:

- CRUD
- filtering
- pagination
- analytics
- validation
- automated testing

and benefits from separation of concerns.

---

## 12. Deterministic seed data

### Decision

The project generates 10,000 deterministic employee records.

### Reasoning

Deterministic data provides:

- predictable demos
- reproducible development
- easier debugging
- consistent analytics

### Tradeoff

The seeded dataset is synthetic and does not attempt to reproduce every real-world compensation pattern.

Its purpose is application testing and demonstration.

---

## 13. Docker-based development environment

### Decision

Frontend, backend and SQLite runtime data are managed through Docker.

### Reasoning

This provides:

- consistent Node.js versions
- reproducible dependency installation
- simple environment setup
- isolation from the host machine

### SQLite named volume

The SQLite database is stored in a Docker named volume.

A Windows bind-mounted SQLite file previously produced filesystem I/O problems, so the named volume provides a more reliable database runtime environment.

### Tradeoff

Desktop database tools cannot directly edit the live named-volume database.

A database snapshot can be copied out when inspection in DBeaver is needed.

---

## 14. Automated testing balance

### Decision

The project contains both focused unit tests and API integration tests.

### Unit tests

Used for deterministic logic such as:

```text
employee validation
query validation
```

### Integration tests

Used where behavior depends on multiple application layers:

```text
HTTP request
→ Express
→ service
→ repository
→ SQLite
```

### Frontend tests

React Testing Library tests user-observable behavior rather than Material UI implementation details.

### Tradeoff

The project does not attempt to achieve 100% test coverage.

The testing effort focuses on core behavior and regression risk.

---

## 15. Features intentionally not implemented

The following areas were not included without confirmed requirements:

- payroll payment execution
- tax calculation
- payslip generation
- attendance
- leave management
- employee self-service
- banking integration
- authentication and advanced RBAC
- salary-history tracking
- audit trail
- spreadsheet import/export
- live foreign-exchange conversion
- natural-language salary queries

These remain possible extensions rather than assumptions built into the initial implementation.