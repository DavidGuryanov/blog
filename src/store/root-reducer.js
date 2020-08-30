import { combineReducers } from "redux";
import reducerGetArticles from "./reducerGetArticles/reducerGetArticles";
import reducerGetSingleArticle from "./reducerGetSingleArticle/reducerGetSingleArticle";
import reducerCreateUser from "./reducerCreateUser/reducerCreateUser";
import reducerGetCurrentuser from "./reducerGetCurrentUser/reducerGetCurrentUser";
import reducerHandleErrors from "./reducerHandleErrors/reducerHandleErrors";

const rootReducer = combineReducers({
  reducerGetArticles,
  reducerGetSingleArticle,
  reducerCreateUser,
  reducerGetCurrentuser,
  reducerHandleErrors,
});

export default rootReducer;
