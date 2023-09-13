const initialState = {
  counter: 10,
  data: ''
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + action.payload
      }

    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - action.payload
      }

    case 'RESET':
      return (state = initialState)

    default:
      return state
  }
}
export default counterReducer
