import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';

class QuestionList extends Component {

    render() {
        const { questionIds } = this.props
        return (
            <div className='center'>
            <div className='question-list'>
                <ul>
                    {questionIds.map((qid) => (
                        <li key={qid}><Question qid={qid}/></li>
                    ))}
                </ul>
            </div>
            </div>
        )
    }
}

function mapStateToProps({ users, loggedUser, questions }, { isAnswered } ) {
    let questionIds = null
    const answeredQuestionIds = Object.keys(users[loggedUser].answers)
    
    if( isAnswered ) {
        questionIds = answeredQuestionIds
    } else {
        questionIds = Object.keys(questions).filter((qid) => !answeredQuestionIds.includes(qid))
    }

    return {
        questionIds
    }
}

export default connect(mapStateToProps)(QuestionList)