const initialState = {
  counter: 10,
  data: "",
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;

    case "DECREMENT":
      return state - action.payload;

    case "RESET":
      return (state = initialState);
    case "getdcdata":
      return {
        ...state,
        data: action.payload,
      };
    case "Increment":
      return {
        counter: state.counter + action.payload,
      };

    default:
      return state;
  }
};
export default counterReducer;
