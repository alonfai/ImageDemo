# Coding Challenge

This app produces an image in which each color occurs exactly once - with no repetition and no used colors.  

* Each colour is formed by a combination of red, green and yellow with a range between 0-255.

The final result is then printed to the screen

## This project was bootstrapped with [Create React App]

* It also relying on using Web Workers for preformance gain using the `comlink-loader` npm package.

## NPM modules used

In this project, the main npm modules used are

* Node 12.x
* React 16.8+ with React hooks
* Typescript 4
* comlink-loader (assist with web worker communication)
* Jest + Testing-library
* Styled Components for CSS-In-JS styling
* ESLint + Prettier
* husky + lint-staged (for commiting staged files)

***

## Install

Clone the project locally in your machine and run the following command and use either `yarn` / `node` package manager:

``` node
yarn install
```

Alternatively can do with npm (recommended npm 7.x version with support for yarn.lock file)

```node
npm install
```

***

## Available Scripts

In the project directory, you can run:

### `yarn start` - Runs the app in the development mode.

### `yarn test` - Launches the test runner in the interactive watch mode

### `yarn build` - Builds the app for production to the `build` folder.

### `yarn eject` - Ejects the project with copying all the configuration files and the transitive dependencies (e.g. webpack, Babel, ESLint, etc)

### `yarn lint` - runs the linter on all staged files
