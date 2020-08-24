import { combineReducers } from "redux";
import reducerGetArticles from "./reducerGetArticles/reducerGetArticles";
import reducerGetSingleArticle from "./reducerGetSingleArticle/reducerGetSingleArticle";

const reducer = combineReducers({
  reducerGetArticles,
  reducerGetSingleArticle,
});

export default reducer;
