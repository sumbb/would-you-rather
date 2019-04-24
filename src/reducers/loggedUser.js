import { SET_LOGGED_USER } from '../actions/loggedUser'

export function loggedUser(state = '', action) {

    switch (action.type) {
        case SET_LOGGED_USER: 
            return action.id
        default: 
            return state    
    }
}