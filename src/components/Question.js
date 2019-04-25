import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {

    handleSubmit(event) {
        event.preventDefault()
        //todo : redirect to correct page according to answered or unanswered
    }

    render() {
        const { question } = this.props
        console.log('props', this.props)
        if( question === null) {
            return <p>This question does not exist</p>
        }
        
        const { qid, author_name, author_avatar, text } = question
        console.log('question', this.props.question)
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

// todo : tranefr to util function

function getQuestionInfo(question, author) {
    return {
        qid : question.id,
        author_name : author.name,
        author_avatar : author.avatarURL,
        text : question.optionOne.text.substring(0, question.optionOne.text.length/2)
    }
}
export default connect(mapStateToProps)(Question)