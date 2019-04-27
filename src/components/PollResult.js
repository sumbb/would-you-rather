import React, { Component } from 'react'
import { connect } from 'react-redux'
import Option from './Option'

class PollResult extends Component {
    render() {
        const { qid, author_name, author_avatar } = this.props
        return (
            <div className='center'>
                <div className='display-inline'>
                    <div className='poll-result'>
                        <div className='poll-result-heading'>
                            <strong>{`Added by ${author_name}`}</strong>
                        </div>
                        <div className='poll-result-info'>
                            <img 
                                src={author_avatar}
                                alt={`Avatar of ${author_name}`}
                                className='poll-result-avatar'    
                            />
                            <div className='poll-result-redirect'>
                                <h3>Results</h3>
                                <Option qid={qid} option={"optionOne"}/>
                                <Option qid={qid} option={"optionTwo"}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }, { qid }) {
    const question = questions[qid]
    const user = users[question.author]

    return {
        qid,
        author_name : user.name,
        author_avatar :  user.avatarURL
    }

}

export default connect(mapStateToProps)(PollResult)