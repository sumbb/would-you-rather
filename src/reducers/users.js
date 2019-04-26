import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'

export function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS: 
            return action.users
        case ADD_QUESTION: 
            const author = action.question.author
            const qid = action.question.id
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([qid])
                  }
            }    
        default: 
            return state    
    }
}