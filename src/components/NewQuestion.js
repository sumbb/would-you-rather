import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions';
import { isUserLoggedIn } from '../utils/common'
import { withRouter } from 'react-router-dom'
import Login from './Login';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    
    handleSubmit(event) {
            event.preventDefault()
            const { optionOne, optionTwo } = this.state
            const { dispatch, loggedUser, history } = this.props
            dispatch(handleAddQuestion(optionOne, optionTwo, loggedUser))
            this.setState(() => ({
                optionOne: '',
                optionTwo: ''
            }))
            history.push('/')
    }

    handleOptionChange(event) {
        const text = event.target.value
        const name = event.target.name
        this.setState(() => ({
            [name]: text
        }))
    }

    render() {
        if(!isUserLoggedIn(this.props.loggedUser)) {
            return <Login />
        }
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
                    name="optionOne"
                    onChange={(event) => this.handleOptionChange(event)}
                    className='textarea'
                ></textarea>
                <p>--OR--</p>
                <textarea
                    placeholder="Option two"
                    value={optionTwo}
                    name="optionTwo"
                    onChange={(event) => this.handleOptionChange(event)}
                    className='textarea'
                ></textarea>    
                <button
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

export default withRouter(connect(mapStateToProps)(NewQuestion))