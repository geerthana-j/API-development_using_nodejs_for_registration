# CRUD API using Node.js and PostgreSQL

Application is created using Node.js and PostgreSQL

## Frameworks
 - Express.js
 - Sequelize ORM

## Database
Postgresql database is used with sequelize ORM for handling the data

## Features

- Application handles six API end points
    -   User registration
    -   User Login
    -   Inserting a Key value pair (POST)
    -   Retriving the value of a key (GET)
    -   Updating the value of a key (PATCH)
    -   Deleting the key-value (DELETE)
- JSON reponses with specific Error code and Success message
- Sequelize ORM was used instead of standard SQL queries
- JWT authentication was used for Token authentication
- Docker container can also be created using the Dockerfile and docker-compose.yml

## Database Table Structure
 - User Table for storing the user data

| column_name | type | property|
| ------ | ------ |---- |
| username | string | unique|
| email | string |unique|
| password | string|allows null|
| full_name |string |allows null|
| age | integer|allows null|
| gender | string |allows null|

- Data Table for storing the key-value data

| column_name | type | property|
| ------ | ------ |---- |
| key | string | unique|
| value | string |allows null|


## Dockerization
Dependencies for the application has been added in the package.json and Dockerfile contains the details of the image. docker-compose.yml is used for creating multiple container using the image.

### Ports
psql - 5432
node.js - 8080
