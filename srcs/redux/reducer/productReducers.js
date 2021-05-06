import {PRODUCT_DATA} from '../action/productAction'
const initialState = {
    productData:[]
}

export const reducerProduct = (state = initialState, action) => {

    console.log('**product ', state)
    switch (action.type) {
        case  PRODUCT_DATA:
            return {
                productData : action.payload
            }
        default:
            return state;

    }
}