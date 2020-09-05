import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";

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
let persistor = persistStore(store);

export { persistor, store };
