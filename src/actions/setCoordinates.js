import SET_COORDINATES from '../types/setCoordinates'

export default coordinates => (dispatch) => {
  dispatch({
    type: SET_COORDINATES,
    payload: {
      coordinates,
    },
  })
}
