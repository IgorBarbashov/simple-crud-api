# RS School - NodeJS Course - 2021 Q4

## Task 3. Simple CRUD API

### About
CRUD API application using in-memory database and builded on pure Node.js
- [Task page - Simple CRUD API](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md)

## How to install
- Install Node.js 16.13.0 or higher
- Clone this repository
- Switch to **task_03_simple_crud_api** branch
- Install dependencies by command `npm i`

## How to use and run tests
- Command string for start HTTP server:
  - in development mode: `npm run start:dev`
  - in production mode: `npm run start:prod`
- HTTP server will start on the port defined in the `.env` file as variable `PORT`
- Command string for tests:
  - run tests: `npm run test`
  - run tests in watch mode: `npm run test:watch`

## Supported routes and HTTP-methods
API path `/person`:
- **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding personId
- **POST** `/person` is used to create record about new person and store it in database
- **PUT** `/person/${personId}` is used to update record about existing person
- **DELETE** `/person/${personId}` is used to delete record about existing person from database

## Entity interface
Persons are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `name` — person's name (`string`, **required**)
- `age` — person's age (`number`, **required**)
- `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

## Developer environment and instruments
- Node 16.13.0
- Npm 8.1.0
- Webpack 5.64.4
- Jest 27.3.1
- Supertest 6.1.6
- ESLint 8.3.0