import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

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

function addAnswer({ authedUser, qid, answer }) {
    return {
        type: ADD_ANSWER,
        loggedUser : authedUser,
        qid,
        option: answer
    }
}

export function removeAnswer({ authedUser, qid, answer}) {
    return {
        type: REMOVE_ANSWER,
        loggedUser: authedUser,
        qid,
        option: answer
    }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
    const question = {
        optionOneText,
        optionTwoText,
        author
    }
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(question).then((question) => {
             dispatch(addQuestion(question))
             dispatch(hideLoading())
        })  
    }
}

export function handleAddAnswer(info) {
    return (dispatch) => {
         dispatch(addAnswer(info))
        return _saveQuestionAnswer(info)
            .catch((error) => {
                console.error('Error while adding the ansered', error)
                dispatch(removeAnswer(info))
                return alert("Can't Add answer, try again")
        })
    }
    
}