Merchant API

A Node.js backend API for merchant registration, login, and product management with JWT authentication.
--------------------------------------
Features

Merchant Registration
Merchant Login with JWT Token
Product CRUD operations (Create, Read, Update, Delete)
-------------------------------
Technologies
Node.js
Express.js
MongoDB Atlas
JWT Authentication
bcrypt (Password Hashing)
Joi (Validation)
--------------------------------------
Installation
Clone the Repository



git clone <repository-url>
cd merchant-api

Install Dependencies


npm install
Set Up Environment Variables Create a .env file and add the following:

env

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
Start the Server

For development mode:
npm run dev
--------------------------------
For production mode:
npm start