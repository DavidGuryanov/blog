const initialState = {
  article: {},
  loading: false,
};

function reducerCreateArticle(state = initialState, action) {
  switch (action.type) {
    case "CREATE_ARTICLE":
      if (action.payload) {
        console.log(action.payload);
        return { article: action.payload, loading: false };
      }
      return { article: {}, loading: true };
    default:
      return state;
  }
}
export default reducerCreateArticle;
