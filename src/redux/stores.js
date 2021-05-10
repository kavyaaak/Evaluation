import { createStore, combineReducers } from 'redux';
import {reducerProduct} from './reducer/productReducers';
import {userReducer} from './reducer/userReducers';
const rootReducer = combineReducers({
    productStore:reducerProduct,
    userStore:userReducer
})
const stores = () => {
    return createStore(rootReducer);

}

export default stores;
