import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Navigation from './Navigation'
import Login from './Login'
import ViewPoll from './ViewPoll'
import Leaderboard from './Leaderboard'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div>
            <Navigation />
            {this.props.isLoading === true
                ? null
                : <div>
                   <Route path='/' exact component={Login}/>
                   <Route path='/home' component={Home}/>
                   <Route path='/add' component={NewQuestion}/>
                   <Route path='/questions/:qid' component={ViewPoll}/>
                   <Route path='/leaderboard' component={Leaderboard}/>
                  </div> }
          </div>
        </Fragment>
      </Router>
    );
  } 
}

function mapStateToProps({ loggedUser }) {
  return {
    isLoading : loggedUser === '' ? true : false
  }
}

export default connect(mapStateToProps)(App)