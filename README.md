Finance Data Processing & Access Control Backend
Overview

This project is a backend system for a Finance Dashboard Application that manages financial records with role-based access control

key features include:
1. User Authentication and Authorization: Implemented using JWT tokens, allowing users to register, log in, and access resources based on their roles (admin, manager, user).
2. Financial Record Management: CRUD operations for financial records, including income, expenses, and budgets
3. Role-Based Access Control: Different access levels for admins, managers, and regular users to ensure data security and integrity.
4. RESTful API: A well-structured API for seamless integration with the frontend dashboard.

Technologies Used
- Node.js with Express.js for the backend server
- MongoDB for the database to store user information and financial records
- Mongoose for object data modeling (ODM)
- JSON Web Tokens (JWT) for authentication and authorization
- bcrypt for password hashing
- dotenv for environment variable management

Installation
1. Clone the repository:
   git clone
2. Navigate to the project directory:
    cd finance-dashboard-backend
3. Install dependencies:
    npm install
    