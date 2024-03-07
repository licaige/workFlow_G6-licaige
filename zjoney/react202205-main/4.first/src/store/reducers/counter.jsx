import { ADD, MINUS } from '../action-types';

function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD: return { number: state.number + 1 }
    case MINUS: return { number: state.number - 1 }
    default:
      return state;
  }
}

export default counter;