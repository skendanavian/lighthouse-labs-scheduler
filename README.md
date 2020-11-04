# Interview Scheduler

## Introduction

Interview Scheduler is a React.js app that allows users to book, edit, and cancel appointments through the UI. The project was created as part of the React curriculum at Lighthouse Labs.

## Functionality

The application is used to schedule interview appointments. The user can select the day, time, and interviewer for each appointment. They also have the ability to edit and cancel their appointments. Loading views are shown during async database operations. The application keeps track of the available appointment slots for each day and renders/updates using axios api requests to a PostgreSQL database.

## Development Details

Interview Scheduler was developed using the React.js library. The components were each created and tested in isolation using Storybook. Each component was then integrated into the fully functional application along with some custom hooks. The development process included extensive unit, integration, and end-to-end testing with jest, cypress, and the react testing library.

## Project Photos

---

<p align='center'>Scheduler - User Experience</p>
<p align="center">
<img src="https://github.com/skendanavian/Scheduler-App/blob/master/docs/project-photos/Scheduler_Gif.gif?raw=true" height="400">
</p>

---

<p align='center'>Scheduler - Static</p>
<p align="center">
<img src="https://github.com/skendanavian/Scheduler-App/blob/master/docs/project-photos/Screen%20Shot%202020-11-04%20at%203.37.29%20PM.png?raw=true" >

</p>

---

## Technical Specifications

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## dependencies

```
   "axios": "^0.21.0",
   "classnames": "^2.2.6",
   "normalize.css": "^8.0.1",
   "react": "^16.9.0",
   "react-dom": "^16.9.0",
   "react-scripts": "3.0.0"
```
