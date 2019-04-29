import { RECEIVE_USERS } from '../actions/users'
import { 
    ADD_QUESTION,
    ADD_ANSWER,
    REMOVE_ANSWER } from '../actions/questions'

export function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS: 
            return action.users
        case ADD_QUESTION: 
            const author = action.question.author
            const questionId = action.question.id
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([questionId])
                  }
            }
        case ADD_ANSWER: 
            const { qid, loggedUser, option } = action  
            return {
                ...state,
                [loggedUser]: {
                  ...state[loggedUser],
                  answers: {
                    ...state[loggedUser].answers,
                    [qid]: option
                  }
                }
              }
        case REMOVE_ANSWER: 
              const { qidR, loggedUserR } = action
              const answers = state[loggedUserR].answers
              const newAnswers = Object.create(answers)
              delete newAnswers[qidR]
              return {
                  ...state,
                  [loggedUserR]: {
                    ...state[loggedUserR],
                    answers: newAnswers
                  }
                }             
        default: 
            return state    
    }
}