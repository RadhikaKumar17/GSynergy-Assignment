# Project Overview

This project converts a given CSV file into a set of backend APIs, providing a structured and accessible way to interact with the data. The backend APIs are hosted on **[Render](https://render.com/)**.

## Features Implemented

- **CSV to API Conversion**: The provided CSV data has been successfully transformed into accessible APIs.
- **User Authentication**: Implemented sign-in functionality.
- **Store Management**: Added the functionality to add a store.
- **Cypress Testing**: Conducted Cypress testing for the Sign-In component to ensure reliability.

## Backend API

The APIs are hosted at:

🔗 **Base URL:** [https://gsynergy-backend.onrender.com](https://gsynergy-backend.onrender.com)

### API Endpoints

| Endpoint      | Method | Description                          |
| ------------- | ------ | ------------------------------------ |
| `/stores` | GET   | Get all store data       |
| `/skus` | GET   | Get all sku data                     |
| `/chart`   | GET    | Get all  chart data |
| `/planning`   | GET    | Get all  planning data |
| `/calculations`   | GET    | Get all  calculations data |



## Testing

Cypress testing has been performed for the **Sign-In** component to ensure proper authentication flow and prevent regressions.

## How to Run Locally

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the backend server:
   ```sh
   npm start
   ```
4. Run Cypress tests:
   ```sh
   npx cypress open
   ```

## Future Improvements

- Extend API functionality for advanced queries.
- Enhance frontend UI for store management.
- Improve authentication with role-based access control.

---

For any issues or suggestions, feel free to open an issue or contribute to the repository!
