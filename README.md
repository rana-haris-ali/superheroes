# **Project Documentation**

## **Table of Contents**

1. [Overview](#overview)
2. [Backend](#backend)
   - [Tools and technologies](#tools-and-technologies)
   - [API Documentation](#api-documentation)
   - [Database](#database)
   - [Environment Variables](#environment-variables)
3. [Frontend](#frontend)
   - [Tools and technologies](#tools-and-technologies)
   - [State Management](#state-management)
   - [Features](#Features)
   - [Team Fights (/teams/fight)](#team-fights-teamsfight)
4. [Development](#development)
   - [Setting up the Project](#setting-up-the-project)
5. [Data Seeding](#data-seeding)
6. [Deployment](#deployment)
	- [Docker](#docker)
	- [Openshift](#openshift)

## **Overview**

This project is a full-stack application built with Next.js (frontend) and FastAPI (backend).This application uses data from the [Superhero API](https://www.superheroapi.com). The application allows users to manage superheroes, including creating, reading, updating, and deleting (CRUD) operations on various resources.

## **Backend**

### Tools and technologies

- FastAPI (Web Framework)
- Pydantic (Data Validation)
- Alembic (migrations)
- SQLAlchemy (ORM)
- Uvicorn (Web server)

### API Documentation

The backend API is built using FastAPI and is documented using OpenAPI. The API endpoints are as follows:

- **GET /**: Displays a "Hello World" Message

#### User Management

- **POST /users**: Signs up new user with email and password.
- **GET /auth/login**: Authenticates user and returns access_token. Since OAuth2 is being used, the parameters are named "username" and "password" by default. However, our project uses email for validation so send email in "username".

#### Superheros

- **GET /superheroes**: Get all superheroes with optional search parameter.
- **GET /superheroes/{id}**: Gets a single superhero.
- **PUT /superheroes/{id}**: Updates a single superhero.
- **GET /superheroes/suggest**: Recommends a team of superheroes based on different parameters such as alignment ('good', 'bad', 'neutral') and attributes ('intelligence', 'speed') etc.

#### Favorite Superheros

- **GET /superheroes/favorites**: Get all liked superheroes of the user.
- **POST /superheroes/favorites**: Creates a new favorite superhero.
- **DELETE /superheroes/favorites**: Deletes a favorite superhero.
- **GET /superheroes/favorites/{id}**: Gets a single favorite superhero of the user.

#### Teams

- **GET /teams**: Get all teams of the user and optional search.
- **POST /teams**: Creates a new team.
- **GET /teams/all**: Gets and searches among all teams, not just the current user's teams.

### Database

The database schemas are defined using SQLAlchemy. I used **MySQL** for this project but because we are using an ORM, it should be easily possible to change to other supported databases. The database models are as following:

- **User**: Represents a user in the system, with attributes such as `id`, `email`, and `password`.
- **Superhero**: Represents a superhero in the system, with attributes such as `id`, `name`, and `alignment`.
- **Alias**: Represents an alias for a superhero, with attributes such as `id`, `superhero_id`, and `name`.
- **Favorite Superhero**: Represents a favorite superhero for a user, with attributes such as `id`, `user_id`, and `superhero_id`.
- **Team**: Represents a team of superheroes, with attributes such as `id`, `name`, and `user_id`.
- **Team Member**: Represents a member of a team, with attributes such as `id`, `team_id`, and `superhero_id`.

### Environment Variables

The following environment variables are used in the backend:

- **DATABASE_URL**: The URL of the database
- **ACCESS_TOKEN_SECRET_KEY**: The secret key used to sign access tokens
- **ACCESS_TOKEN_ALGORITHM**: The algorithm used to sign access tokens
- **ACCESS_TOKEN_EXPIRE_MINUTES**: The number of minutes until access tokens expire

## **Frontend**

### Tools and technologies

- Next.js (v14)
- Shadcn (components and UI)
- Tailwind (styling)
- Tanstack React Query (APIs and state management)
- react-hook-form (form handling)
- zod (form validation)

### State Management

The project doesn't use a dedicated state management library. It relies on state management provided by Context API, react-query, react-hook-forms and useState hook.

#### Features

- **Authentication**: A feature that allows users to log in and out of the application.
- **Superhero List (/)**: A feature that allows users to view a list of all superheroes in the system.
- **Superhero Details (/superhero/{id})**: A feature that allows users to view detailed information about a single superhero.
- **Team Creation (/teams/create)**: A feature that allows users to manually create a team, or use the recommendation feature to generate various types of teams.
- **Team List (/teams/list)**: A feature that allows users to view a list of all teams in the system.
- **Team Members**: A feature that allows users to view the members and average attributes of a team.
- **Favorite Superheroes**: A feature that allows users to mark superheroes as favorites.
- **Favorite Superheroes (/favorites)**: A feature that allows users to view their favorite superheroes.
- **Edit Superhero (/superhero/{id}/edit)**: A hidden page that can be used by admins to edit the superheroes. Several frontend and backend validation mechanisms make sure that non-admin users can't use this feature.

### Team Fights (/teams/fight):

A feature that allows users to compare their teams with other teams and see who will win.

## **Development**

### Setting up the Project

#### Backend

1. Clone this repository.
2. Navigate to the `backend` directory: `cd backend`
3. Install dependencies: `pip -r requirements.txt`
4. Start the backend server using `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`

#### Frontend

1. Clone this repository (if not already done).
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the frontend development server: `npm run dev`

# **Data Seeding**

If run using docker-compose, the database container will already contain the seeded data of superheroes and default user accounts which are as following:

	Admin account
		username/email: haris@example.com
		password: 123456

	Normal User Account
		username/email: rana@example.com
		password: 123456

If needed, you can also run the `start.sql` script in your MySQL database which will dump the seed data.

# **Deployment**

The applications can be run in standalone mode, docker containers, docker-compose service or on openshift.

## **Docker**

This project can be run as a docker-compose service which will run the backend, frontend and database containers and it is the easiest way to run the project.

Run `docker-compose up` or `docker compose up` (depends on your OS and docker version) in the project's root directory (where docker-compose.yml file is located).

## **OpenShift**

### Deploying OpenShift YAML Files

Follow these steps to deploy the OpenShift specification files (YAML files) to OpenShift.

### 1. Log in to OpenShift

First, log in to your OpenShift cluster using the OpenShift CLI (`oc`). If you don’t have the `oc` command-line tool installed, you can download it from the OpenShift console.

```bash
oc login <openshift-cluster-url>
```

### 2. Create a New OpenShift Project (Optional)

You can create a new project (namespace) where your application will be deployed, or you can use an existing one.

```bash
oc new-project <project-name>
```

### 3. Deploy the Resources

You can give path to the openshift directory in the root of this project and all required resources will be created.

```bash
oc apply -f <path-to-openshift-directory>
```

### 4. Verify the Resources

After applying the files, you can check the status of the resources in your project.

```bash
oc get pods
oc get svc
oc get dc
oc get pvc
```

These commands will show you the status of your Pods, Services, DeploymentConfigs, and PersistentVolumeClaims, respectively.

### 5. Expose the Services (Optional)

If your services are not already exposed (i.e., they don’t have routes), you can expose them using:

```bash
oc expose svc frontend-service
oc expose svc backend-service
```

This will create routes to your frontend and backend services, making them accessible from outside the OpenShift cluster.

### 6. Check the Application

Once the routes are created, you can access your application using the route URL. You can list the routes using:

```bash
oc get routes
```

You will see the external URLs for your frontend and backend services.
