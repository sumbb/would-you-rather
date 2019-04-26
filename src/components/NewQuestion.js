import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    
    handleSubmit(event) {
            event.preventDefault()
            const { optionOne, optionTwo } = this.state
            const { dispatch, loggedUser } = this.props
            dispatch(handleAddQuestion(optionOne, optionTwo, loggedUser))
            this.setState(() => ({
                optionOne: '',
                optionTwo: ''
            }))
    }

    handleOptionOneChange(event) {
        const text = event.target.value
        this.setState(() => ({
            optionOne: text
        }))
    }    

    handleOptionTwoChange(event) {
        const text = event.target.value
        this.setState(() => ({
            optionTwo: text
        }))
    }

    render() {
        const { optionOne, optionTwo } = this.state
        return (
            <div className='new-question'>
                <div className='new-question-heading center'>
                    <h2>Creat New Question</h2>
                </div>
                <h4>Complete the Question:</h4>
                <h3>Would You Rather</h3>
                <form className='new-question-form' onSubmit={(event) => this.handleSubmit(event)}>
                <textarea
                    placeholder="Option one"
                    value={optionOne}
                    onChange={(event) => this.handleOptionOneChange(event)}
                    className='textarea'
                ></textarea>
                <p>--OR--</p>
                <textarea
                    placeholder="Option two"
                    value={optionTwo}
                    onChange={(event) => this.handleOptionTwoChange(event)}
                    className='textarea'
                ></textarea>    
                <button
                    className='btn'
                    type='submit'
                    disabled={optionOne === '' || optionTwo === ''}>
                Submit
                </button>
               </form>
            </div>
        )
    }
}

function mapStateToProps({ loggedUser}) {
    return {
        loggedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)