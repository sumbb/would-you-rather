import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getScore, getAnswers, getQuestions } from '../utils/common'

class User extends Component {
    render() {
        const { name, avatar, score, answers, questions } = this.props
        return (
            <div className='user'>
                <img 
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='user-avatar'    
                />
                <div className='user-info'>
                    <h3>{name}</h3>
                    <div className='user-qa-info'>
                        <strong className='first-child'>Anwered Questions</strong>
                        <strong>{answers}</strong>
                    </div>
                    <div className='user-qa-info'>
                        <strong className='first-child'>Created Questions</strong>
                        <strong>{questions}</strong>
                    </div>
                </div>
                <div className='score'>
                    <div className='score-heading'>
                        <strong>Score</strong>
                    </div>
                    <div className='score-info'>
                        <strong>{score}</strong>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }, { uid }) {
    const user = users[uid]
    return {
        name : user.name,
        avatar : user.avatarURL,
        score : getScore(user),
        answers : getAnswers(user),
        questions : getQuestions(user),
    }
}

export default connect(mapStateToProps)(User)