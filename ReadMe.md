# ParaBank Test Automation Framework

## Overview
The ParaBank Test Automation Framework is an end-to-end (E2E) testing solution designed for the ParaBank application. This framework utilizes Playwright, a powerful automation library, to perform UI and API testing. The framework is structured to facilitate easy test creation, execution, and maintenance, ensuring that the application remains robust and reliable.

## Features
- **E2E Testing**: Comprehensive testing of user flows from registration to account management.
- **API Testing**: Validation of backend services through API endpoints.
- **Modular Design**: Organized page objects and reusable components for better maintainability.
- **Dynamic Data Handling**: Utilizes random data generation for user registration and transactions.
- **Reporting**: Generates detailed test reports for easy analysis of test results.

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Steps to Install
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd parabank-test-automation
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   If your tests require specific environment variables, create a `.env` file in the root directory and define the necessary variables.

## Running Tests

### Test Structure
The tests are organized into two main categories:
- **UI Tests**: Located in the `tests/ui` directory, these tests cover user interactions with the application.
- **API Tests**: Located in the `tests/api` directory, these tests validate the backend services.

### Running Tests
You can run the tests using the following npm scripts:

- **Run UI Tests**:
  ```bash
  npm run test:ui
  ```

- **Run API Tests**:
  ```bash
  npm run test:api
  ```

- **Run All Tests**:
  ```bash
  npm run test:all
  ```

### Viewing Reports
After running the tests, you can view the generated reports using:

bash
npm run report

## Test Framework Structure
- **tests/**: Contains all test specifications.
  - **api/**: API test specifications.
  - **ui/**: UI test specifications.
- **pages/**: Page object models that encapsulate the UI elements and actions.
- **fixtures/**: Custom test fixtures for managing test context and dependencies.
- **utils/**: Utility functions and classes for common operations.
- **playwright.config.ts**: Configuration file for Playwright settings.

## Contributing
Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- [Playwright](https://playwright.dev/) for providing a powerful testing framework.
- [ParaBank](https://parabank.parasoft.com/) for the application used in this testing framework.