import { combineReducers } from '@reduxjs/toolkit'
import dessertsReducer from '../features/dessertsSlice'
import newDessertReducer from '../features/newDessertSlice'

const rootReducer = combineReducers({
  desserts: dessertsReducer,
  newDessert: newDessertReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
