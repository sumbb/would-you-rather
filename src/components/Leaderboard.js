import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortUsersByScore, isUserLoggedIn } from '../utils/common'
import User from './User'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
    render() {

        const { userIds, isUserLoggedIn } = this.props

        if(!isUserLoggedIn) {
            return <Redirect to='/'/>
        }

        return (
            <ul className='user-list'>
                {userIds.map((uid) => (
                    <li key={uid}>
                        <User uid={uid}/>
                    </li>
                ))}
            </ul>
        )
    }
}

function mapStateToProps({ users, loggedUser}) {
    return {
        userIds : sortUsersByScore(users),
        isUserLoggedIn : isUserLoggedIn(loggedUser)
    }
}

export default connect(mapStateToProps)(Leaderboard)