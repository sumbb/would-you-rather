import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions';

class TakePoll extends Component {
    state = {
        option : null
    }

    handleChange(event) {
        const option = event.target.value
        this.setState(() => ({
            option: option
        }))
    }

    handleSubmit(event) {
        event.preventDefault()
        const { loggedUser, qid, dispatch } = this.props
        const { option } =this.state 
        const info = {
            authedUser: loggedUser,
            qid,
            answer: option
        }
        dispatch(handleAddAnswer(info))
    }

    render() {
        const { author_avatar, author_name, optionOneText, optionTwoText } = this.props
        const { option } = this.state
        return (
            <div className='center'>
                <div className='display-inline'>
                    <div className='poll-question'>
                        <div className='poll-question-heading'>
                            <strong>{`${author_name} asks:`}</strong>
                        </div>
                        <div className='poll-question-info'>
                        <img 
                            src={author_avatar}
                            alt={`Avatar of ${author_name}`}
                            className='question-avatar'    
                        />
                        <div className="question-redirect">
                        <h4>Would you rather</h4>
                        <form className='take-poll-form' onSubmit={(event) => this.handleSubmit(event)}>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="option" 
                                        value={"optionOne"}
                                        onChange={(event) => this.handleChange(event)}
                                    />{` ${optionOneText}`}
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="option" 
                                        value={"optionTwo"}
                                        onChange={(event) => this.handleChange(event)}
                                    />{` ${optionTwoText}`}
                                </div>
                                <button 
                                    disabled={option === null}>
                                    Submit
                                </button>
                        </form>
                        
                    </div>
                </div>
            </div>
            </div>
            </div>  
        )
    }
}

function mapStateToProps({questions, users, loggedUser}, { qid }) {
    const question = questions[qid]
    const author = users[question.author]

    return {
        qid,
        loggedUser,
        author_name : author.name,
        author_avatar : author.avatarURL,
        optionOneText : question.optionOne.text,
        optionTwoText : question.optionTwo.text,
    }
}

export default connect(mapStateToProps)(TakePoll)