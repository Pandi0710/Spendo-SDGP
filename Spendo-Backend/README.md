# Spendo Backend

The backend server for the Spendo Finance Tracker, built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints
- MongoDB database integration
- User authentication
- Transaction management
- Category management

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Transactions

- `GET /api/transactions/user/:userId` - Get all transactions for a user
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/stats/user/:userId` - Get transaction statistics

### Categories

- `GET /api/categories/user/:userId` - Get all categories for a user
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category
- `POST /api/categories/defaults` - Create default categories

## Project Structure

```
/
├── src/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Express server
```

## Security Notes

This is a demonstration application. In a production environment, you would need to implement:

- Password hashing
- JWT authentication
- Input validation
- HTTPS
- Rate limiting
- Additional security measures