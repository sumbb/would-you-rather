import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAnsweredByUser, isUserLoggedIn, isValidQuestion } from '../utils/common'
import TakePoll from './TakePoll'
import PollResult from './PollResult'
import Login from './Login'
import NotFound from './NotFound';

class ViewPoll extends Component {
    render() {
        const { qid, isAnswered, isUserLoggedIn, isValidQuestion } = this.props
        if(!isUserLoggedIn) {
            return <Login />
        } else if( !isValidQuestion ) {
            return <NotFound />
        } else if (isAnswered) {
            return <PollResult qid={qid}/>
        } else {
            return <TakePoll qid={qid} />
        }
    }
}


function mapStateToProps({ users, loggedUser, questions }, props) {
    const { qid }  = props.match.params
    const isUserLoggedInProp = isUserLoggedIn(loggedUser)
    const isValidQuestionProp = isValidQuestion(qid, questions)
    const isAnswered =  isValidQuestionProp && isUserLoggedInProp ? isAnsweredByUser(users[loggedUser], qid) : null
    return {
        qid,
        isAnswered,
        isUserLoggedIn : isUserLoggedInProp,
        isValidQuestion : isValidQuestionProp
    }
}

export default connect(mapStateToProps)(ViewPoll)