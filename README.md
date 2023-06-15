# Questionnaire REST API

This project provides a REST API for a questionnaire system that allows users to choose and complete tests from a selection of available tests. The API is built using Node.js and utilizes a MongoDB database for data storage.

- User sign up and login functionality
- Edit or add phone number for authenticated users
- Submitting and scoring tests
- Data persistence using MongoDB

## Tech Stack
+ Node.js  + Express.js + MongoDB (with Mongoose) 
+ Argon2 for Password Encryption 
+ JSON Web Tokens (JWT) for Authentication
## Running the Project
To run the project locally, follow the steps below:
1. Clone the repository to your local machine using the following command:
```
git clone https://github.com/mrsayan/CareerCarve-Assignment.git
```
#### For Backend
2. Navigate to the project directory: `cd Backend`
#### Set Up the Environment
3. Create a new file named .env in the project root directory.
4. Define the required environment variables in the .env file. For example:
```
PORT=5253
MONGO_URI=mongodb://localhost:27017/DB_NAME
JWT_SECRET=Wzvn77gGRZzNeXvUhOmiqt456kF.....
JWT_EXPIRE=30d
```
#### Install Dependencies
5. Install the project dependencies by running the following command:
```
npm install
```
#### Start the Server
6. Start the development server using the following command:
```
npm start
```

The API should now be running at http://localhost:3030 by default.

## API Reference in screenshots/API.md
For the detailed API documentation, please refer to the [API Reference](ScreenShots/API.md), where I have attached the Postman collection and environment files for testing the API.

- ### Welcome
```
GET /api/welcome
```
#### Response Body
```
{
    "success": true,
    "message": "API successfully called"
}
```
- ### Sign Up
```
POST /api/signup
```
#### Request Body
```
{
    "name": "Sayan Hazra",
    "email": "me@sayyan.ml",
    "password": "livelife@123",
    "phone_number": "+917278400000"
}
```
#### Response Body
```
{
    "success": true,
    "message": "Signed up successfully"
}
```
- ### Login
```
POST /api/login
```
#### Request Body
```
{
    "email": "me@sayyan.ml",
    "password": "livelife@123"
}
```
#### Response Body
``` 
{
    "success": true,
    "message": "ara ara"
}
```
- ### Edit Phone Number
```
PUT /api/edit/phonenumber
```
#### Request Body
```
{
    "phone_number": "+917278400000"
}
```
#### Response Body
```
{
    "success": true,
    "message": "Phone number changed / added successfully"
}
```
- ### Submit Test
```
POST /api/submit-test
```
#### Request Body
```
{
    "user_id": "me@sayyan.ml",
    "test_id": "525",
    "responses": [
        {
            "questionID": "Q1",
            "answers": [
                "Yes"
            ]
        },
        {
            "questionID": "Q2",
            "answers": [
                "Python",
                "Java",
                "C++"
            ]
        }
    ]
}
```
#### Response Body
```
{
    "userID": "me@sayyan.ml",
    "testID": "525",
    "score": 2 // Score obtained by the user
}
```

## Challenges
- I had to learn about the Argon2 password hashing algorithm and JSON Web Tokens (JWT) for authentication ensuring the security of user data.
- Designing an efficient data structure to store and retrieve test questions and user responses.
- Implementing the scoring logic for multiple-choice questions with single or multiple correct answers.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.