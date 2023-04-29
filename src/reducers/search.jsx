const initialState = {};
export default (state = initialState, action) => {
  if (action.type === 'SEARCH_BUS') {
    return { ...state, ...action.search };
  }
  return state;
};
