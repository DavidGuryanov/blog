const initialState = {
  article: {},
};

function reducerCreateArticle(state = initialState, action) {
  switch (action.type) {
    case "CREATE_ARTICLE":
      return { article: action.payload };
    default:
      return state;
  }
}
export default reducerCreateArticle;
