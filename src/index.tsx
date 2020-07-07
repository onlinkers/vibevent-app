import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Amplify from "aws-amplify";

/* COMPONENTS */
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import reducers from "store/reducers";
import { fetchAllEventData } from "store/actions/eventActions";

/* UTILITIES */
import { AppProvider } from "context/AppContext";
import awsconfig from "./aws-config.js";

/* STYLESHEETS */
import "./index.scss";
import "./styles/antd-overwrites.scss";
import "./styles/components.scss";
import "./styles/layout.scss";
import "./styles/typography.scss";
import "antd/dist/antd.css";

// configure amplify
Amplify.configure(awsconfig);

// possibly abstract this once the amount of middlewares and enhancers grow
const thunkMiddleware = applyMiddleware(thunk);

// compose with redux dev tools if in 'development' mode and if exists in browser
const reduxDevTools =
  process.env.NODE_ENV === "development" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const composedEnhancers =
  typeof reduxDevTools === "function"
    ? compose(thunkMiddleware, reduxDevTools)
    : compose(thunkMiddleware);

const store = createStore(reducers, undefined, composedEnhancers);

// store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchAllEventData());

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppProvider>
      <div className="App">
        <Routes />
      </div>
    </AppProvider>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Finally, log for debugging and development purposes
console.log(`Running app in ${process.env.NODE_ENV} environment`); // eslint-disable-line
