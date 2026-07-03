# WorkoutLogApp Architecture

## Overview

WorkoutLogApp is a full-stack workout tracking platform with a React frontend, Express backend, and PostgreSQL database.

## System Architecture

```text
User
  |
  v
React Frontend
  |
  v
Express REST API
  |
  v
PostgreSQL Database
```

## Frontend

The frontend is responsible for user interaction, authentication state, and displaying workout-related data.

## Backend

The backend exposes REST API endpoints for authentication, users, workouts, programs, and related resources.

## Database

PostgreSQL stores users, workouts, exercises, programs, exercise tracking data, and authentication-related data.

## Authentication Flow

```text
User submits login credentials
  |
  v
Backend validates credentials
  |
  v
Backend signs JWT
  |
  v
Frontend stores JWT
  |
  v
Frontend sends JWT in Authorization header
  |
  v
Protected backend routes validate token
```

## Key Design Decisions

- PostgreSQL is used because the data is relational and benefits from structured queries.
- JWT authentication is used to support stateless API authentication.
- The app currently uses a monolithic backend architecture fro simplicity and maintainability.
