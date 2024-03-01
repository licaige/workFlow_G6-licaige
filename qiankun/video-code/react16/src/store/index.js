import { useContext } from 'react';
import { context } from '../hooks/useLocalContext';

export const useRealReducer = () => {
  return useContext(context)
}
