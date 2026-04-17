# OpenCart Playwright Automation Portfolio

Portfolio project for UI and API test automation with Playwright and TypeScript.
The project targets a local OpenCart instance for end-to-end browser coverage and uses the Restful Booker API for API testing examples.

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

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Data-driven testing with inline arrays, CSV, and JSON
- Faker for dynamic test data
- Allure reporting
- Jenkins for CI execution

## What Is Covered

### UI tests

- Home page validation
- Navigation to Register and Login pages
- Product search for existing and non-existing products
- Login scenarios with:
  - hardcoded test data
  - inline data-driven array
  - CSV file
  - JSON file
- Registration scenarios with:
  - successful registration using generated data
  - existing email validation
  - invalid email format validation
  - empty first name validation

### API tests

POST `https://restful-booker.herokuapp.com/booking`

- Create booking with hardcoded request body
- Create booking with request body from JSON file
- Create booking with Faker-generated random data
- Validate response status, booking id, and returned booking data

## Current Test Data Sources

- `testdata/users.csv`
- `testdata/users.json`
- `testdata/postRequest.json`
- `utils/randomDataGenerator.ts`

## Local Setup

### Prerequisites

- Node.js 18 or newer
- A local OpenCart instance available at `http://localhost/opencart/upload/`

If your OpenCart URL is different, update:

- [playwright.config.ts](E:/Programming/2026/automation-portfolio-main/playwright.config.ts)
- [test.config.ts](E:/Programming/2026/automation-portfolio-main/test.config.ts)

### Install

```bash
npm ci
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run only API tests

```bash
npx playwright test tests/apitests
```

### Open the HTML report

```bash
npx playwright show-report
```

## Reporting

The project is configured with these reporters:

- list
- html
- dot
- allure-playwright

After execution, Playwright HTML output and Allure results are generated locally.

## Jenkins

The repository includes a [Jenkinsfile](E:/Programming/2026/automation-portfolio-main/Jenkinsfile) that:

- checks out the project
- installs dependencies
- installs Playwright browsers
- runs the full Playwright suite
- archives Playwright and Allure artifacts

The pipeline is configured to run in a custom Jenkins workspace:

`E:\JenkinsWorkspaces\automation-portfolio-main`

## Notes

- The UI suite currently runs on Chromium.
- `baseURL` is configured for a local OpenCart environment.
- There is no GitHub Actions workflow in the repository at the moment.

## Contact

Petya Mindalova

- LinkedIn: [petya-mindalova](https://www.linkedin.com/in/petya-mindalova-9722a72b)
- Email: `petmindalova@gmail.com`
