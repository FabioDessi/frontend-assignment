# Secfi Assignment Front-End Engineers

**author: [fabioDessi](https://github.com/FabioDessi/)**

## Table of Contents

- How much time did you end up spending on it?
- What are some of the design decisions you made?
- What do you like about your implementation?
- What would you improve next time?

### How much time did you end up spending on it?

I've spent approximately 10 hours with this project, some of the time was spent on understanding the api and i've used this opportunity to try some tdd techniques i've recently studied.

### What are some of the design decisions you made?

Starting from the boilerplate, I've decided to use create-react-app and extend it with prettier, elsint and husky. As for styling i've used [styled-component](https://www.npmjs.com/package/styled-components), and for parsing the csv currencies list i've used [papa parse](https://www.npmjs.com/package/papaparse).

Going into the app development, i've opted for a tdd approach, took this test as an opportunity to try out some techniques studied recently.

on the components side, i've decided to keep the application simple, splitting the api calls and initialization in this way:

- The _App_ component converts the csv into an array of objects with the currencies and passes it to the _CurrencyExchange_ component
- All the interaction is handled in the _CurrencyExchange_ components, states for the inputs are set here, including the call to the _CURRENCY_EXCHANGE_RATE_.
- The Second call, to _FX_DAILY_ is on the _Chart_ component, this call is sent after the from and to values are set and passed as props. The Chart is loaded only once the value is set

### What do you like about your implementation?

The TDD approach is something i enjoyed.

I like how using some helpers just before setting the state for the api call results, the components can be easily reused with some other provider, with some tweak on the helpers.

### What would you improve next time?

Creating custom hooks for the api calls and add cache, error and loading statuses.
Prefer to avoid for this time, since the development was already taking so long.
