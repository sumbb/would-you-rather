import { _saveQuestion } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
 
export function handleAddQuestion(optionOneText, optionTwoText, author) {
    const question = {
        optionOneText,
        optionTwoText,
        author
    }
    return (dispatch) => {
        return _saveQuestion(question).then((question) => {
             dispatch(addQuestion(question))
        })  
    }
}