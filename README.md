# ExpressJs MongoDB Docker

## Introduction

Welcome to the ExpressJS-MongoDB Docker project! This repository provides a detailed example of how to integrate
Express.js, a leading Node.js web application framework, with MongoDB, a strong NoSQL database, all containerized with
Docker. It is intended to demonstrate best practices, provide a robust project structure, and incorporate end-to-end
tests to ensure that the application functions properly.

## Features

- Express.js Setup: A ready-to-use server setup with Express.js.
- MongoDB Integration: Pre-configured MongoDB connection for data persistence.
- Blog Module: Full CRUD operations for blog posts.
- Docker-Ready: Complete Docker setup for building and deploying the application.
- End-to-End Testing: Integrated E2E tests to ensure everything works as expected.

## Upcoming features

- Postman Collections: For easy API testing.
- Swagger Documentation: Accessible via Postman to facilitate API testing.
- Git Tag Versioning: Planned for better version management.

## Prerequisites

To get started with this project, you have two primary setup options based on your preferences and environment:

**For Docker-Based Setup**:

- Docker is the simplest way to run the project. Docker will containerize the environment, making it easy to get up and running in
seconds. Ensure you have Docker installed on your machine.
  - [Install Docker](https://docs.docker.com/engine/install/)

**For Traditional Local Setup**

- Node.js and npm: Required for running the application and managing its dependencies. 
    - [Install Node.js](https://nodejs.org/en/download) and npm
- MongoDB: Needed as the database for the application.
    - [Install MongoDB](https://www.mongodb.com/try/download/community)

Select the setup that works best for you.
If you desire a rapid start with little setting, use the Docker-based setup.
If you want more control over the environment and dependencies,
or if you want to work with Node.js and MongoDB, the classic local setup may be more suited.

## Getting started

### Docker-Based Setup

1. Clone the project
   ```shell
   git clone https://github.com/denisakp/expressjs-mongo-docker.git
   cd expressjs-mongo-docker
   ```
2. Run docker compose
   ``` shell
   docker compose up -d
   ```
3. Test the API
   Navigate to [this link ](http://localhost:3000/api/healthcheck) in your browser to access the API

### Traditional Node.js setup
1. Clone the repository
      ```shell
   git clone https://github.com/denisakp/expressjs-mongo-docker.git
   cd expressjs-mongo-docker
   ```
2. Install node_modules
   ```shell
   npm install -f
   ```
3. Create and Configure .env File
   ```shell
    cp .env.example .env
   ```
    Edit the .env file to match your local configuration values.
4. Start the application
    ```shell
    npm start
   ```
5. Test the API
   Navigate to [this link ](http://localhost:3000/api/healthcheck) in your browser to access the API


## Testing the API with Postman

The easiest way to test the API is through the provided Postman collection. The collection can be imported into your 
local Postman workspace. It describes each API resource clearly and allows for proper testing.

## Running Tests with Jest and Supertest

### Quick overview of Jest and SuperTest

Jest is a pleasant JavaScript testing framework that focuses on simplicity. It integrates smoothly with projects built
with Babel, TypeScript, Node.js, and other technologies. Jest is well-known for its rapid execution, snapshot testing,
and excellent out-of-the-box support for JavaScript testing. Supertest is a Super-agent-driven HTTP server testing
framework that uses a fluent API to run tests on your Node.js HTTP server.

### Why E2E tests?

E2E testing entails testing an application's process from start to end. It seeks to simulate real-world user
scenarios, ensuring that all integrated components of an application work together as planned. E2E tests in Node.js
projects verify that the server, database, and any integrations operate together properly, detecting errors that unit
or integration tests may miss.

### Running E2E Tests in This Project

We use Jest and Supertest for E2E testing in this project. To run these tests, follow these steps:

```shell
npm test
```
This command will execute the E2E tests suites that use Supertest to generate requests and verify responses.

### Documentation

For more details about Jest and Supertest, please visit their documentation:

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [SuperTest Documentation](https://github.com/ladjs/supertest)


## Todo

- [ ] add a test case for loading posts with limit and page queries
- [ ] add a functional test to make sure that the limit (if provided) is numeric <= 25 && page (if provided) to be 
numeric and always >= 1
- [ ] add a pagination response model
- [ ] add a test case for load blog posts to make sure the response contains the desired model
- [ ] add postman API documentation
- [ ] add Nginx proxy to docker compose
- [ ] add more bugs to fix later 😏 