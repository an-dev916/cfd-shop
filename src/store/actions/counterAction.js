export const increment = (payload) => {
  return {
    type: 'INCREMENT',
    payload: payload || 1
  }
}

export const decrement = (payload) => {
  return {
    type: 'DECREMENT',
    payload: payload || 1
  }
}

export const resetCounter = () => {
  return {
    type: 'RESET'
  }
}

// export const callAPi = () => {
//   return async (dispatch) => {
//     const res = await fetch("https://dog.ceo/api/breeds/image/random");
//     const data = await res.json();
//     console.log("data :>> ", data);
//     console.log("dispatch :>> ", dispatch);
//     dispatch({
//       type: "getdcdata",
//       payload: data.message,
//     });
//   };
// };
