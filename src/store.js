import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import coordinatesReducer from './reducers/coordinates'

const reducer = combineReducers({
  coordinatesReducer
})
const store = createStore(
  reducer,
  applyMiddleware(thunk),
)
export default store
