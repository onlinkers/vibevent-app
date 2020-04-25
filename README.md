[![Netlify Status](https://api.netlify.com/api/v1/badges/9c2b1115-c493-484a-a3be-e9062c9573f4/deploy-status)](https://app.netlify.com/sites/link-link-web-app/deploys)

# Event Discovery App
ONLINKERS' Event Web Application

Some libraries used in this app:
- Router via `react-router`
- Storage Management via `redux`
- Component Styles via `ant-d`
- Maps via `mapbox-gl`
- HTTP Requests via `axios`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node.js v12 (npm v6) (Download [here](https://nodejs.org/en/download/))
- EsLint v6.8 (Setup Instructions [here](https://eslint.org/))
- Typescript v3 (Download [here](https://www.typescriptlang.org/))

### Installing

1. Clone the repository: ```git clone```
2. Install the packages: ```cd event-discovery-webapp``` and ```npm install```
3. Setup the [environmental files](#environmental-files)

### Running

Start the web app by running

```npm start```

This should open a browser tab with the URL: "http://localhost:8000". The port 8000 may differ if you are running multiple instances of the app, but in general 800x. If a browser tab isn't opened, simply look through the logs on the CLI to find the address. 

## Development

Development is recommended to be done on a system where [eslint](https://eslint.org/) is installed, and using [VSCode](https://code.visualstudio.com/)

### Linting

Linters are put into place to exercise good and consistent coding style, regardless of developer. Editing lint rules and such can be done by changing the `.eslintrc.js` file, which is not recommended until approved by lead developers of the team.

Lint checks will run during a *pre-commit*, meaning that they will throw an error and abort the commit if the style checks detect an error (warnings are ignored)

<hr />

Further good coding practices can be addressed by reading [this](https://github.com/orgs/onlinkers/teams/principal/discussions/1) document on the **TEAMS** page

<hr />

### Environmental Files

A dotenv (`.env`) environmental file needs to be created at `root`

> You can do this easily by copying and renaming `.env.default`

### Components and Utilities

Custom pages are located in `src/views`, while custom-created components are located in `src/components`

Any miscellaneous functions are located in `src/utils`, where `src/utils/index.js` compiles all the functions and exports them for easy importing

### API Requests and Services

Throughout the application, service functions will be using `axios` to make HTTP requests to save/recieve data from the backend database. The axios client is initialized in the `src/api.js` folder, which is used to make different requests as used by the service files located in `src/services`.

> Axios is used because of its advantage in handling JSON conversion, error responses, and compatibility with the Promise API introduced in ES6. 

When a service is used, the function will return a promise, which can then be used dynamically by chaining with functions specified in `.then` and `.catch` calls

### Styles

Styles are written **inside** `.css` or `.scss` files alongside each component file

Overwrites to libraries or global style variables and constants can be wrriten in `src/assets/scss`, which is pre-pended in the root component

## Deployment

None yet. Application's `master` branch is currently built on Netlify for live viewing. Build settings can be accessed ONLY through the onlinker-admin netlify account. Netlify teams has a billing plan which we are too cheap to purchase as of now.

Run `npm run build` to minify and compile the application for production. Build location is in the `build` folder

## Contributing
Contributions are only accepted from members of the [team](https://github.com/orgs/onlinkers/people). Instructions to start contributing are as follows:

1. Clone the remote repository into a local environment
2. Setup the repository (instructions [here](#getting-started))
3. Make the appropriate edits and additions
4. Submit pull requests with a detailed commit message of what additions were made
--> Pull requests will be accepted after being reviewed and after the appropriate tests are conducted

### Built With

* [React](https://reactjs.org/docs/getting-started.html) - View Javascript Framework
* [Netlify](https://www.netlify.com/) - Build and Deployment

### Customize configuration
See [Configuration Reference](https://create-react-app.dev/docs/advanced-configuration/).
