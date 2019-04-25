import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading'
import Login from './Login'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <LoadingBar/>
      <div>
      {this.props.isLoading === true
                ? null
                : <div>
                   <Login/>
                  </div> }
      </div>
      </Fragment>
    );
  } 
}

function mapStateToProps({ loggedUser }) {
  return {
    isLoading : loggedUser === '' ? true : false
  }
}

export default connect(mapStateToProps)(App)