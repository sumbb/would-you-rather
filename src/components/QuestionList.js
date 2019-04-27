import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';
import { isUserLoggedIn } from '../utils/common'
import { sortQuestionsByTimestamp } from '../utils/common'

class QuestionList extends Component {

    render() {
        const { questionIds, isAnswered } = this.props
        return (
                <ul className='question-list'>
                    {questionIds.map((qid) => (
                        <li key={qid}><Question qid={qid} isAnswered={isAnswered}/></li>
                    ))}
                </ul>
            
        )
    }
}

function mapStateToProps({ users, loggedUser, questions }, { isAnswered } ) {
    let questionIds = null
    const answeredQuestionIds = isUserLoggedIn(loggedUser) ? Object.keys(users[loggedUser].answers) : null
    
    if( isAnswered ) {
        questionIds = answeredQuestionIds
    } else {
        questionIds = Object.keys(questions).filter((qid) => !answeredQuestionIds.includes(qid))
    }

    return {
        questionIds : sortQuestionsByTimestamp(questionIds, questions)
    }
}

export default connect(mapStateToProps)(QuestionList)