import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setLoggedUser } from '../actions/loggedUser';
import { withRouter } from 'react-router-dom'

class Login extends Component {
    state = {
        selectedUser : null
    }

    handleChange(event) {

        let userId = event.target.value
        userId = userId !== '' ? userId : null

        this.setState(() => ({
            selectedUser : userId
        }))
    }

    handleSubmit(event) {
        event.preventDefault() 
        this.props.dispatch(setLoggedUser(this.state.selectedUser))
        this.props.history.push(`/home`)
    }

    render() {
        const { selectedUser } = this.state
        const { users } = this.props
        return (
            <div align="center">
               <h3>Select A User to Login</h3>
               <form  onSubmit={(event) => this.handleSubmit(event)}>
               <select onChange={(event) => this.handleChange(event)}>
                    <option value=''>Choose User</option> 
                    {users.map((user)=> (
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                </select>
                 <br></br><br></br>
                <button
                    type='submit'
                    disabled={ selectedUser === null}>
                Submit
                </button>
               </form>
            </div>
        )
    }
}

function mapStateToProps( { users }) {
    const userList = Object.keys(users).map((userId) => ({
        id : userId ,
        name : users[userId].name,
        avatar : users[userId].avatarURL
    }))

    return {
        users : userList
    }
}

export default withRouter(connect(mapStateToProps)(Login))