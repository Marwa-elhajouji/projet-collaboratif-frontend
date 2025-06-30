# Collaborative Project Frontend

This is the frontend of a collaborative management application built with Angular.  
It provides user-friendly interfaces for managing users, projects, and tasks.


## Features

- Create and view users
- Create and view projects
- Create and manage tasks with statuses and deadlines
- Tab-based navigation: Users, Projects, Tasks
- Communicates with a backend API (default: `http://localhost:8080`)



## Project Structure

The application is built using:

- Angular standalone components
- Angular Router for navigation
- Reactive Forms for handling input
- Bootstrap (via CSS classes) for UI layout
- HttpClient for HTTP requests


## Installation

```bash
npm install
```
## Run Unit Tests

```bash
npm run test
```

Runs the unit tests using Karma with the ChromeHeadless browser.

## Code Coverage Report

This project includes automated unit tests with code coverage tracking.  
Every push and pull request to the `main` branch triggers a GitHub Actions workflow that runs the test suite and generates an HTML coverage report.

The report is automatically published to GitHub Pages and can be viewed here:

[View Coverage Report](https://Marwa-elhajouji.github.io/projet-collaboratif-frontend)




## Start Development Server

```bash
ng serve
```
Then open http://localhost:4200 in your browser.

### Docker Build & Run

To build and run the app in a Docker container:

```bash
docker build -t projet-collaboratif-frontend .
docker run -d -p 4200:80 projet-collaboratif-frontend
```

Then visit: http://localhost:4200

##  Backend Communication in Docker

When running the frontend in Docker, the frontend container **does not share the same "localhost"** as the backend container. To avoid `ERR_CONNECTION_REFUSED` errors when accessing the backend (e.g. `http://localhost:8080/api`):

- The backend should be run with Docker Compose (or another method) and **must expose port 8080 to the host**.
- The frontend must keep using `http://localhost:8080` as its API base URL in `environment.ts`, so that requests from the browser (outside Docker) reach the backend correctly.


## CI/CD Pipeline (GitHub Actions)

The project includes a GitHub Actions workflow (`.github/workflows/frontend.yml`) that:

- Installs dependencies with `npm ci`
- Runs unit tests with coverage: `npm run test:coverage`
- Builds the Angular application: `npm run build`
- Publishes the HTML coverage report automatically to GitHub Pages

This pipeline runs automatically on every `push` and `pull_request` to the `main` branch.
