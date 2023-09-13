import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDogImg } from '../../store/actions/dogAction'

const TestPage = () => {
  const { counter } = useSelector((state) => state.counter)
  const dog = useSelector((state) => state.dog)
  console.log('dog', dog)
  const dispatch = useDispatch()
  const increaseValue = () => {
    dispatch({ type: 'INCREMENT', payload: 10 })
  }
  const decreaseValue = () => {
    dispatch({ type: 'DECREMENT', payload: 10 })
  }

  const resetValue = () => {
    dispatch({ type: 'RESET', payload: 10 })
  }

  const fetchDog = () => {
    dispatch(fetchDogImg())
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>TestPage</h1>
      <h2>{counter}</h2>
      <Button onClick={increaseValue}>INCREMENT</Button>
      <Button onClick={decreaseValue}>DECREMENT</Button>
      <Button onClick={resetValue}>RESET</Button>
      <img src={dog?.message} alt='' />
      <Button onClick={fetchDog}>GET DOG IMGS</Button>
    </div>
  )
}

export default TestPage
