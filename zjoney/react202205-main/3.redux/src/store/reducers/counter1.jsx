import { ADD1, MINUS1, DOUBLE } from '../action-types';
let initState = { number: 0 };
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD1:
      return { number: state.number + 1 };
    case MINUS1:
      return { number: state.number - 1 };
    case DOUBLE:
      return { number: state.number * 2 };
    default:
      return state;
  }
}
export default reducer;