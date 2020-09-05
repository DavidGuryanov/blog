import { combineReducers } from "redux";
import reducerGetArticles from "./reducerGetArticles/reducerGetArticles";
import reducerCreateUser from "./reducerCreateUser/reducerCreateUser";
import reducerGetCurrentuser from "./reducerGetCurrentUser/reducerGetCurrentUser";
import reducerSetStatus from "./reducerSetStatus/reducerSetStatus";
import reducerCreateArticle from "./reducerCreateArticle/reducerCreateArticle";

const rootReducer = combineReducers({
  reducerGetArticles,
  reducerCreateUser,
  reducerGetCurrentuser,
  reducerSetStatus,
  reducerCreateArticle,
});

export default rootReducer;
