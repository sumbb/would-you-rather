import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calculatePercentage } from '../utils/common'

class Option extends Component {
    render() {
        const { isOptionSelected, optionText, total, votes, percentage} = this.props
        const className = isOptionSelected ? 'option option-selected' : 'option'
        return (
            
            <div className={`${className}`}>
                <p>Would you rather {optionText} ?</p>
                <div className="progress">
                    <div 
                        className="bar"
                        style={{
                            width: `${percentage}%`
                        }}
                    >{percentage}%</div>
                </div>
                <strong>{votes} out of {total} votes</strong>
                { isOptionSelected && <strong>Your vote.</strong>}
            </div>
            
            
        )
    }
}

function mapStateToProps({ users, questions, loggedUser}, { qid, option }) {
   const  question = questions[qid]
   const isOptionSelected = question[option].votes.includes(loggedUser)
   const optionText = question[option].text 
   const total =  Object.keys(users).length
   const votes =  question[option].votes.length
   const percentage = calculatePercentage(votes, total)

   return {
       optionText,
       total,
       votes,
       percentage,
       isOptionSelected
   }
}

export default connect(mapStateToProps)(Option);