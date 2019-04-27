import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAnsweredByUser, isUserLoggedIn } from '../utils/common'
import { Redirect } from 'react-router-dom'
import TakePoll from './TakePoll'
import PollResult from './PollResult'


class ViewPoll extends Component {
    render() {
        const { qid, isAnswered } = this.props
        if(this.props.isAnswered === null ) {
            return <Redirect to='/'/>
        } else if (isAnswered) {
            return <PollResult qid={qid}/>
        } else {
            return <TakePoll qid={qid} />
        }
    }
}


function mapStateToProps({ users, loggedUser}, props) {
    const { qid }  = props.match.params
    const isAnswered =  isUserLoggedIn(loggedUser) ? isAnsweredByUser(users[loggedUser], qid) : null
    return {
        qid,
        isAnswered
    }
}

export default connect(mapStateToProps)(ViewPoll)