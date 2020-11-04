# Interview Scheduler

=======

## Introduction

Interview Scheduler is a React.js app that allows users to book, edit, and cancel appointments through the UI. The project was created as part of the React curriculum at Lighthouse Labs. The app has unit, integration, and end-to-end testing implemented and Storybook was used to develop and test each component in isolation.

## Functionality

Customers can view a menu, login and order food. The customer will then be texted an estimated time for pickup and the restaurant owner will be notified via text of the new order. The kitchen staff will then receive a display of the new order on a kitchen runner page which displays the current orders, orders just received and orders ready for pickup. Once the food is ready the kitchen staff will update the order on the webapp which will then notify the user that their food is ready. Once the user has paid, the restaurant staff will then complete the order on the webapp which will maintain it in the database for record keeping.

## Development Details

The core of Burger Bar is built with the Node, Express and PostgreSQL. The templating engine is EJS. Further functionality is extended with the Twilio texting API. Various Node packages are utilized for user authentication and security including cookie-session and bcrypt. Phone number input is parsed and validated with a [fork](https://github.com/catamphetamine/libphonenumber-js/) of [google/libphonenumber](https://github.com/google/libphonenumber), minimized and written in javascript.

## Project Photos

---

<p align='center'>Home</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/HomePage.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/HomeResponsive.png?raw=true" height="300">
</p>

---

<p align='center'>Menu</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/MenuPage.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/MenuResponsive.png?raw=true" height="300">
</p>

---

<p align='center'>Login</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/Login.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/LoginResponsive.png?raw=true" height="300">
</p>

---

<p align='center'>Kitchen</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/Kitchen.png?raw=true" height="400">
</p>

---

<p align='center'>Orders</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/OrderPage.png?raw=true" height="400">
</p>

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
