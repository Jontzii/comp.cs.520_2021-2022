# Instructions

## Starting server backend

The backend for all the exercises is located inside the the directory `backend`
at the root of the repository.

1. Setup/install backend
   - **this stage needs to be performed only once**
   - **you can skip this stage if the backend is already installed**
   - change working directory to `backend`
   - inside `backend` directory run `npm install`

2. Starting the backend server
   - change working directory to `backend`
   - inside `backend` directory run `npm run react-crud`
   - server listens on http://localhost:3001/

3. Stopping the backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `backend`
2. inside `backend` directory run `npm run reset-db`

## Setup the exercise

- change working directory to `react/players_crud`
- run `npm install` to install all dependencies
- **Copy all components (`PlayerInfo`, `PlayerLink`, `PlayersList`, and `RequestStatus`) from the previous exercise `react/players_fetch` as a starting point for this exercise.**
- API documentation can be viewed in [http://localhost:3001](http://localhost:3001)

## Run the exercise

- In the backend directory start the server (`npm run react-crud`)
- In another terminal inside the exercise directory run `npm start` to run the app in
  the app in the development mode. Open [http://localhost:3000](http://localhost:3000)
  to view it in your browser.

**NOTE: Inside *package.json* there is a proxy setting (`"proxy": "http://localhost:3001"`) which allows you to call the backend directly without the host and port. For example, you can replace `http://localhost:3001/api/players` with `/api/players` omitting the host and port.**
