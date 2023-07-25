const dogReducer = (state = null, action) => {
  switch (action.type) {
    case "RANDOM":
      return action.payload;

    default:
      return state;
  }
};

export default dogReducer;
