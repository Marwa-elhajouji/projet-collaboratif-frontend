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

## Start Development Server

```bash
ng serve
```
Then open http://localhost:4200 in your browser.

### Docker Build & Run

To build and run the app in a Docker container:

```bash
docker build -t projet-collaboratif-frontend .
docker run -p 4200:80 projet-collaboratif-frontend
```

Then visit: http://localhost:4200

## CI/CD Pipeline (GitHub Actions)

The project includes a GitHub Actions workflow (.github/workflows/frontend.yml) that:

Installs dependencies with npm ci

Runs tests: npm run test -- --watch=false --browsers=ChromeHeadless

Builds the application with: npm run build

This pipeline runs automatically on every push and pull_request to the main branch.