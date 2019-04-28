import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../utils/common';
import { setLoggedUser } from '../actions/loggedUser';

class Navigation extends Component {
  handleSubmit(event) {
      event.preventDefault()
      this.props.dispatch(setLoggedUser(null))
      this.props.history.push('/')
  }  
  render() {
      const { avatar, name} = this.props
      return (
        <nav className='nav center'>
            <ul>
                <li>
                    <NavLink to='/'  activeClassName='active'>
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                     New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                     Leader Board
                    </NavLink>
                </li>
                
                {name !== null ? (
                    <Fragment>
                        <li>
                            <div className='nav-user'>
                                <img 
                                    src={avatar}
                                    alt={`Avatar of ${name}`}
                                    className='nav-avatar'    
                                />
                                <p>{`Hello, ${name}`}</p>
                            </div>
                        </li>
                        <li><button
                                onClick={(event) => this.handleSubmit(event)}
                        >Logout</button></li>
                    </Fragment>
                ): (null)}
            </ul>
         </nav>
  )
 }
} 

function mapStateToProps({ users, loggedUser}) {
    const user = isUserLoggedIn(loggedUser) ? users[loggedUser] : null 
    const name = user !== null ? user.name : null
    const avatar = user !== null ? user.avatarURL : null
    
    return {
        uid : loggedUser,
        name,
        avatar
    }
}
export default withRouter(connect(mapStateToProps)(Navigation))