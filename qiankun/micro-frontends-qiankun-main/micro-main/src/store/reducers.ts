import counterReducer from 'store/counter';
import { pokemonService } from 'store/pokemon'
import commonReducer from 'store/common';

export const reducers = {
  common: commonReducer,
  counter: counterReducer,
  [pokemonService.reducerPath]: pokemonService.reducer,
}

export const middlewares = [
  pokemonService.middleware,
]