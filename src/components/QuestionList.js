import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionList extends Component {

    render() {
        console.log('questionIds', this.props.questionIds)
        return (
            <div>
                QuestionList
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