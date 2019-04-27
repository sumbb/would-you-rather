import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestionInfo } from '../utils/common'
import { withRouter } from 'react-router-dom'

class Question extends Component {

    handleSubmit(event) {
        event.preventDefault()
        this.props.history.push(`/question/${this.props.question.qid}`)
    }

    render() {
        const { question } = this.props
        if( question === null) {
            return <p>This question does not exist</p>
        }
        
        const { author_name, author_avatar, text } = question
        return (
            <div className='question'>
                <div className='question-heading'>
                        <strong>{`${author_name} asks:`}</strong>
                </div>
                <div className='question-info'>
                    <img 
                        src={author_avatar}
                        alt={`Avatar of ${author_name}`}
                        className='question-avatar'    
                    />
                    <div className="question-redirect">
                        <h4>Would you rather</h4>
                        <p>...{text}...</p>
                        <button className='btn' onClick={(event) => this.handleSubmit(event)}>View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users }, {qid, isAnswered}) {
    
    const question = questions[qid]
    const author = question !== null ? users[question.author] : null

    return {
        question : question !== null 
                   ? getQuestionInfo(question, author)
                   : null,
        isAnswered           
    }
}


export default withRouter(connect(mapStateToProps)(Question))