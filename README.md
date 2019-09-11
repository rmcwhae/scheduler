# Interview Scheduler

Interview Scheduler is a [React](https://reactjs.org/) application that allows users to book, edit, and cancel interviews. Data is stored in a PostgreSQL database via requests to an API server. Websockets are also used to enable a realtime experience. Testing methods such as [Storybook](https://storybook.js.org/), [Jest](https://jestjs.io/), and [Cypress](https://www.cypress.io) were used in the development of this app.

Created by Russell McWhae during the Lighthouse Labs Calgary Web Dev Bootcamp in September 2019.

## Screenshots

### Interview Scheduler Home
!["Interview Scheduler Home"](./docs/desktop-home.png)

### Adding a new appointment
!["Adding a new appointment"](./docs/desktop-appointment-form-empty.png)

### Submitting the new appointment
!["Submitting the new appointment"](./docs/desktop-appointment-form-full.png)

### Saving the new appointment
!["Saving the new appointment"](./docs/desktop-appointment-saving.png)

### Hovering over an existing appointment
!["Hovering over an existing appointment"](./docs/desktop-appointment-hover.png)

### Deleting an existing appointment
!["Deleting an existing appointment"](./docs/desktop-appointment-delete.png)

### The appointment has been deleted
!["The appointment has been deleted"](./docs/desktop-appointment-deleted.png)

### Mobile view
!["Mobile view"](./docs/mobile-home.png)

### Adding a new appointment (mobile view)
!["Adding a new appointment (mobile view)"](./docs/mobile-form.png)

## Dependencies

* Node.js
* Etc.

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


## Running Cypress

Running API server in test mode (for correct database seed)
```sh
NODE_ENV=test npm start
```
```sh
npm run cypress
```
