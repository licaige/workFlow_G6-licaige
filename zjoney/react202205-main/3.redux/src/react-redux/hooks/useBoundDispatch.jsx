import { useContext } from 'react';
import { bindActionCreators } from '../../redux';
import ReactReduxContext from '../ReactReduxContext';
function useDispatch(actionCreators) {
    const { store } = useContext(ReactReduxContext);
    const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
    return boundActionCreators;
}
export default useDispatch;