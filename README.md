
# [Studiovity Backend Internship Assignment](https://studiovity.notion.site/Backend-Engineer-Assignment-52ce701ca7e240eb841e1f2a84abbf8d)




## Authors

- [@JustUzair](https://www.github.com/JustUzair)

## Implemented Features

- Develop a REST API using Express.js to manage users, characters and relations in a screenplay.
- Implement CRUD operations for characters, relations.
- Used a mongodb cluster to store and retrieve data.
- API is gated by email and password authentication and jsonwebtoken (JWT) and only authorized users can access it (in our case authorized users are admins).
    - This includes:
        - Login
        - Sign Up
            - send custom welcome template when the new user registers.
            - sign up as an admin.
            - sign up as a normal user.
        - Forgot password (Receive reset link on email to reset password)
        - Reset password (Reset link expires after 10 mins of issuance)
        - JWT is embedded into the headers as http-cookie only.
- Security features include but not limited to are:
    - prevention parameter pollution
    - prevention of no-sql query injection
    - Secure http headers with help of [helmet](https://github.com/helmetjs/helmet)
- Implemented multiple types of API routes 
    - Public Routes : Accessible by anyone
    - Protected Routes : Accessible by only logged in users
    - Restricted Routes : Accessible by only the users of a particular role (ex : admin)
- Tested API and written API documentation using postman



## Installation and Working of the Project
The API is developed using node version 20
To install and run this this project

```bash
    git clone https://github.com/JustUzair/studiovity-backend-assignment.git
    cd studiovity-backend-assignment
    npm install
        OR
    npm install --legacy-peer-deps           [USE IN CASE OF ANY ERRORS WHILE INSTALLATION OF DEPENDENCIES]
    npm start
```



