import SET_COORDINATES from '../types/setCoordinates'

const initState = {
  coordinates: {}
}
export default (state = initState, action) => {
  switch (action.type) {
    case SET_COORDINATES:
      return { ...state, coordinates: action.payload.coordinates }
    default:
      return state
  }
}
