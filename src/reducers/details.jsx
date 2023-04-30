const initialState = {};
export default (state = initialState, action) => {
  if (action.type === 'BUS_SELECTION') {
    return { ...state, selectedBusId: action.id };
  } else if (action.type === 'SEAT_SELECTION') {
    return { ...state, selectedSeats: action.seats };
  }
  return state;
};
