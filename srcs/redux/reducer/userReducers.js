import {USERNAME} from '../action/userAction';
const initialState =[]

export const userReducer = (state = initialState, action) => {

    console.log('**user$$ ', state)
    switch (action.type) {
        case  USERNAME:
            return {
                userData : action.payload
            }
        default:
            return state;

    }
}