import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app/App";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/configureStore";

const Index = () => {
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Index />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
