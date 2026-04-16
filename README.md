# 🧪 OpenCart – Playwright Automation Portfolio

A portfolio project demonstrating real-world test automation skills,
built as part of a transition into QA Automation engineering.

End-to-end test automation project built with **Playwright** and **TypeScript**,
targeting the [OpenCart](https://www.opencart.com/) demo e-commerce application.

---

## 🏗️ Project Structure

```
automation-portfolio/
├── pages/              # Page Object Model classes
├── tests/              # Test specs
├── testdata/           # Test data files (CSV / JSON / faker-generated data)
├── utils/              # Helper utilities and data generation (faker)
├── allure-results/     # Allure report output
├── .github/workflows/  # GitHub Actions CI pipeline
├── Jenkinsfile         # Jenkins CI pipeline
├── playwright.config.ts
└── test.config.ts      # Custom test data configuration
```

## ⚙️ Tech Stack

- **Playwright** – browser automation
- **TypeScript** – typed test code
- **Page Object Model** – scalable, maintainable test architecture
- **Data-Driven Testing (array / CSV / JSON)** – parameterized test execution with external test data
- **@faker-js/faker** – dynamic test data generation
- **Allure** – test reporting
- **GitHub Actions** – CI on push
- **Jenkins** – local CI pipeline with Allure integration

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- OpenCart installed locally at `http://localhost/opencart/upload/`

> **Note:** Tests target a local OpenCart instance.
> Update `baseURL` in `playwright.config.ts` if your setup differs.

### Install dependencies

```bash
npm ci
npx playwright install
```

### Run tests

```bash
npx playwright test
```

### View HTML report

```bash
npx playwright show-report
```

---

## 🔁 CI/CD

Tests run automatically on every push via **GitHub Actions**.
A **Jenkinsfile** is included for teams using Jenkins — it installs dependencies,
runs tests, and publishes the Allure report as a post-build artifact.

---

## 📋 Test Coverage (current)

| Area      | Status         | Notes                      |
|-----------|----------------|----------------------------|
| Home Page | ✅ Implemented  |                            |
| Login     | ✅ Implemented  | DDT: array / CSV / JSON    |
| Register  | 🔄 In progress  |                            |
| Search    | 📋 Planned      |                            |
| Cart      | 📋 Planned      |                            |
| API       | 🔄 In progress  |                            |

---

## 📫 Contact

**Petya Mindalova**
💼 [LinkedIn](https://www.linkedin.com/in/petya-mindalova-9722a72b)
📧 petmindalova@gmail.com
