
# BudgetBuddy Backend

## Overview

BudgetBuddy is a finance tracking application that helps users manage their personal budgets by categorizing expenses and tracking them across multiple categories and subcategories.

## Key Features

- **User Authentication & Authorization**: Register, login, and manage users securely using JWT.
- **CRUD Operations**: Manage budgets, transactions, categories, and subcategories.
- **RESTful API**: Easily extendable and scalable REST API.
- **Validation**: Input validation using `express-validator` to ensure data integrity.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or higher) installed
- **MongoDB** (running locally or via cloud)
- **npm** (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darthpenetratus/budgetbuddy-backend
   ```

2. Navigate to the project directory:
   ```bash
   cd budgetbuddy-backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root directory:

   Example `.env` file:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/budgetbuddy
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

To run the application use the following command:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### **Authentication**
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in an existing user and receive a JWT token

### **Transactions**
- `POST /api/transactions` - Add a new transaction
- `GET /api/transactions` - Retrieve all transactions for the authenticated user
- `GET /api/transactions/:id` - Get a specific transaction by ID
- `PATCH /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### **Categories and Subcategories**
- `POST /api/categories` - Create a new category
- `GET /api/categories` - Retrieve all categories
- `POST /api/subcategories` - Create a new subcategory for a specific category
- `GET /api/subcategories` - Retrieve all subcategories for a specific category

### **Authorization**

All protected routes require a valid JWT token. You can pass the token in the `Authorization` header as follows:

```bash
Authorization: Bearer your_jwt_token
```

## Project Structure

```
budgetbuddy-backend/
├── config/         # Database config
├── controllers/         # API controllers
├── models/              # Mongoose models
├── routes/              # API routes
├── middlewares/         # Authorization, error handling middlewares
├── server.js            # Entry point
├── app.js               # Application
├── .env                 # Environment variables
└── README.md            # This file
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB ODM for schema definition and data modeling
- **JWT**: JSON Web Tokens for secure authentication
- **express-validator**: Middleware for request validation
- **argon2**: For password hashing
- **Nodemon**: For automatic server restarts during development

## Testing

You can test the API using tools like **Postman** or **cURL**.

## Contributing

To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.
