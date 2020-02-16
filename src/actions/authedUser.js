export const SET_AUTHER_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id){
    return{
        type: SET_AUTHER_USER,
        id
    }
}