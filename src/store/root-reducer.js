import { combineReducers } from "redux";
import reducerGetArticles from "./reducerGetArticles/reducerGetArticles";
import reducerGetSingleArticle from "./reducerGetSingleArticle/reducerGetSingleArticle";
import reducerCreateUser from "./reducerCreateUser/reducerCreateUser";

const reducer = combineReducers({
  reducerGetArticles,
  reducerGetSingleArticle,
  reducerCreateUser,
});

export default reducer;
