import { 
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    ADD_ANSWER,
    REMOVE_ANSWER
 } from '../actions/questions'

export function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS: 
            return action.questions
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: {
                    ...action.question
                }
            }
        case ADD_ANSWER:
            const { qid, loggedUser, option } = action
            return {
                ...state,
                [qid]: {
                  ...state[qid],
                  [option]: {
                    ...state[qid][option],
                    votes: state[qid][option].votes.concat([loggedUser])
                  }
                }
              }
        case REMOVE_ANSWER:
            const { qidR, loggedUserR, optionR } = action
            return {
                ...state,
                [qidR]: {
                  ...state[qidR],
                  [optionR]: {
                    ...state[qidR][optionR],
                    votes: state[qidR][optionR].votes.filter((uid) => uid!== loggedUserR)
                  }
                }
              }         
        default: 
            return state    
    }
}