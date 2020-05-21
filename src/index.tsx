import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

/* COMPONENTS */
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import reducers from "store/reducers";
import { fetchAllEvents } from "store/actions/eventActions";

/* STYLESHEETS */
import "./index.css";

// possibly abstract this once the amount of middlewares and enhancers grow
const thunkMiddleWare = applyMiddleware(thunk);
const reduxDevTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const composedEnhancers = compose(thunkMiddleWare, reduxDevTools);

const store = createStore(reducers, undefined, composedEnhancers);

// store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchAllEvents());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
