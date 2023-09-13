export const randomDog = (payload) => {
  return {
    type: 'RANDOM',
    payload
  }
}

export const fetchDogImg = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await res.json()
      if (data.status === 'success') {
        dispatch(randomDog(data))
      } else {
        throw 'error'
      }
    } catch (error) {
      dispatch(randomDog(null))
    }
  }
}
