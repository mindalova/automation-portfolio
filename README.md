# OpenCart Playwright Automation Portfolio

A portfolio project for UI and API test automation with **Playwright** and **TypeScript**.  
The project targets a local OpenCart instance for end-to-end browser coverage and uses the **Restful Booker API** for API testing examples.

---

## Project Structure

```text
automation-portfolio-main/
|-- pages/                 Page Object Model classes
|-- testdata/              CSV and JSON test data
|-- tests/
|   |-- apitests/          API POST booking tests
|   |-- accountRegistration.spec.ts
|   |-- home-page.spec.ts
|   |-- login.spec.ts
|   |-- loginDDT.spec.ts
|   |-- loginCSV.spec.ts
|   |-- loginJSON.spec.ts
|-- utils/                 Data generation helpers
|-- Jenkinsfile            Jenkins pipeline
|-- playwright.config.ts   Playwright configuration
|-- test.config.ts         Shared app and test values
```

---

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Data-driven testing with inline arrays, CSV, and JSON
- Faker for dynamic test data
- Allure reporting
- Jenkins for CI execution

---

## What Is Covered

### UI Tests

- Home page validation
- Navigation to Register and Login pages
- Product search for existing and non-existing products
- Login scenarios:
  - Hardcoded test data
  - Inline data-driven array
  - CSV file
  - JSON file
- Registration scenarios:
  - Successful registration using generated data
  - Existing email validation
  - Invalid email format validation
  - Empty first name validation

### API Tests

`POST https://restful-booker.herokuapp.com/booking`

- Create booking with hardcoded request body
- Create booking with request body from JSON file
- Create booking with Faker-generated random data
- Validate response status, booking ID, and returned booking data

### Current Test Data Sources

- `testdata/users.csv`
- `testdata/users.json`
- `testdata/postRequest.json`
- `utils/randomDataGenerator.ts`

---

## Local Setup

### Prerequisites

- Node.js `>= 18`
- A local OpenCart instance at `http://localhost/opencart/upload/`

If your OpenCart URL is different, update `playwright.config.ts` and `test.config.ts` accordingly.

### Install

```bash
npm ci
npx playwright install
```

### Run All Tests

```bash
npx playwright test
```

### Run Only API Tests

```bash
npx playwright test tests/apitests
```

### Open HTML Report

```bash
npx playwright show-report
```

---

## Reporting

The project is configured with the following reporters:

- `list`
- `html`
- `dot`
- `allure-playwright`

After execution, Playwright HTML output and Allure results are generated locally.

---

## Jenkins

The repository includes a `Jenkinsfile` that:

- Checks out the project
- Installs dependencies
- Installs Playwright browsers
- Runs the full Playwright suite
- Archives Playwright and Allure artifacts

The pipeline is configured to run in a custom Jenkins workspace:

`E:\JenkinsWorkspaces\automation-portfolio-main`

## Notes

- The UI suite currently runs on Chromium.
- `baseURL` is configured for a local OpenCart environment.
- There is no GitHub Actions workflow in the repository at the moment.

## Contact

**Petya Mindalova**  
[LinkedIn](https://www.linkedin.com/in/petya-mindalova-9722a72b)  
`petmindalova@gmail.com`
