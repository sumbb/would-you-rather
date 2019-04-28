import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../utils/common';
import { setLoggedUser } from '../actions/loggedUser';

const paths = [
    {
        path : '/',
        pathName : 'Home'
    },
    {
        path : '/add',
        pathName : 'New Question'
    },
    {
        path : '/leaderboard',
        pathName : 'Leader Board'
    }
]

class Navigation extends Component {
  handleSubmit(event) {
      event.preventDefault()
      this.props.dispatch(setLoggedUser(null))
      this.props.history.push('/')
  }  
  render() {
      const { userAvatar, userName, location } = this.props
      return (
        <nav className='nav center'>
            <ul>
                {
                    paths.map(({ path, pathName}) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                activeClassName='active'
                                className={(location.pathname === path && userName !== null) ? `selected-tab` : ``}
                            >
                            {pathName}
                            </NavLink>
                        </li>
                    ))
                }
                
                {userName !== null ? (
                    <Fragment>
                        <li>
                            <div className='nav-user'>
                                <img 
                                    src={userAvatar}
                                    alt={`Avatar of ${userName}`}
                                    className='nav-avatar'    
                                />
                                <p>{`Hello, ${userName}`}</p>
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
    const userName = user !== null ? user.name : null
    const userAvatar = user !== null ? user.avatarURL : null
    
    return {
        uid : loggedUser,
        userName,
        userAvatar
    }
}
export default withRouter(connect(mapStateToProps)(Navigation))