export const PRODUCT_DATA ="PRODUCT_DATA"

export function storeProductData(payload) {
console.log('**listttt',payload)
    return {
        type:PRODUCT_DATA ,
        payload: payload
    }
}