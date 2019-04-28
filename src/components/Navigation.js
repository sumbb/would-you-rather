import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../utils/common';
import { setLoggedUser } from '../actions/loggedUser';

const paths = [
    {
        path : '/',
        name : 'Home'
    },
    {
        path : '/add',
        name : 'New Question'
    },
    {
        path : '/leaderboard',
        name : 'Leader Board'
    }
]

class Navigation extends Component {
  handleSubmit(event) {
      event.preventDefault()
      this.props.dispatch(setLoggedUser(null))
      this.props.history.push('/')
  }  
  render() {
      const { avatar, name, location } = this.props
      return (
        <nav className='nav center'>
            <ul>
                {
                    paths.map(({ path, name}) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                activeClassName='active'
                                className={location.pathname === path ? `selected-tab` : ``}
                                >
                                {name}
                            </NavLink>
                        </li>
                    ))
                }
                
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