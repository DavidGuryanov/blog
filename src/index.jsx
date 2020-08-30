import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as actions from "./actions/actions";
import styles from "./index.module.scss";
import App from "./components/app/App";
import reducer from "./store/root-reducer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/configureStore";
console.log(store, persistor);

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
// const store = createStore(reducer, enhancer);
// const { dispatch } = store;
// dispatch(actions.fetchArticles());

const Index = () => {
  return (
    // <div className={styles.index}>
    <App />
    //</div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Index />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
