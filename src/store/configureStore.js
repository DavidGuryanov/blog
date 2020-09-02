import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["reducerGetCurrentuser", "reducerGetArticles"],
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, enhancer);
const { dispatch } = store;
let persistor = persistStore(store);

export { persistor, store };
