# Capstone: Restaurant Reservation System

# Restaurant Reservation System

## Live Demo

Explore the Restaurant Reservation System through our interactive live demo.

## Project Overview

This full-stack capstone project was developed for Thinkful's Software Engineering Bootcamp. We tackled a real-world challenge: creating a reservation system designed for fine dining restaurants, used exclusively by restaurant personnel.

## User Stories

Developed with a Test-Driven Development (TDD) approach, our application caters to the needs of restaurant employees, allowing them to:

- **Create Reservations:** Register new reservations with customer contact details. Includes multiple validations to prevent bookings outside business hours.
- **Manage Tables:** Define each table and its seating capacity for optimal reservation assignments.
- **Dashboard:** Access a daily dashboard displaying reservations and tables, with date navigation for efficient customer flow management.
- **Edit Reservations:** Update reservation details as per customer requests.
- **Search Functionality:** Find reservations using a partial match of the phone number.
- **Status Control:** Monitor and update the status of reservations and tables throughout the customer dining experience.

## Technologies

### Back-end

- Node.js
- Express
- Knex
- PostgreSQL (via ElephantSQL)
- Jest (for testing)

### Front-end

- React (including Router, Hooks, and Error Boundaries)
- Bootstrap
- End-to-End Testing

## API Endpoints

Our back-end API, hosted at `https://final-capstone-backend.herokuapp.com`, provides the following endpoints:

| Method | Endpoint                        | Description                                     |
| ------ | ------------------------------- | ----------------------------------------------- |
| GET    | /reservations                   | Retrieves all reservations                      |
| POST   | /reservations                   | Creates a new reservation                       |
| GET    | /reservations?date='YYYY-MM-DD' | Fetches reservations by date (sorted ascending) |
| GET    | /reservations?mobile_number=123 | Searches reservations by phone number partial match |
| GET    | /reservations/:reservationId    | Gets a specific reservation by ID              |
| PUT    | /reservations/:reservationId    | Updates a specific reservation                  |
| PUT    | /reservations/:reservationId/status | Updates only the status of a reservation     |
| GET    | /tables                         | Retrieves all tables                            |
| POST   | /tables                         | Creates a new table                             |
| PUT    | /tables:table_id/seat           | Assigns a reservation to a table and sets status to "occupied" |
| DELETE | /tables:table_id/seat           | Removes a reservation from a table and sets status to "free" |

## Installation Guide

1. **Clone the Repository:** Fork and clone this repository.
2. **Environment Setup:**
   - Run `cp ./back-end/.env.sample ./back-end/.env`.
   - Update the `./back-end/.env` file with your database connections (ElephantSQL instances recommended).
   - Run `cp ./front-end/.env.sample ./front-end/.env` (adjust if a different backend URL is needed).
3. **Install Dependencies:** Execute `npm install` to install necessary dependencies.
4. **Start the Server:**
   - For backend, run `npm run start:dev` in the back-end directory.
   - For frontend, execute `npm start` in the front-end directory. The app
