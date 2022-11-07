## Available Script

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3006](http://localhost:3006) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## To configure the project

### Go to the file called .env

In this file you can configure the following variables:

PORT=3006 (Port where the project will run, by default 3006 to avoid conflicts with API)
REACT_APP_USE_MOCK_DATA = false (If you want to use the mock data, by default it is false)
REACT_APP_DB=http://localhost:3000/user (URL of the API, by default it is http://localhost:3000/user)

### API

The API is in the following repository:
[https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard)

If you use the default api, there is a mistake in the data, so you must change the following line in the file called "data.js" in the folder called "app" in the api project:
(l24) today -> todayScore
