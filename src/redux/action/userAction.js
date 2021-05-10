export const USERNAME ="USERNAME"

export function storeUserData(payload) {
console.log('USERNAME**',payload)
    return {
        type:USERNAME ,
        payload: payload
    }
}