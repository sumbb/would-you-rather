import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import QuestionList from './QuestionList';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { isUserLoggedIn } from '../utils/common';

class Home extends Component {
    
    render() {
      if(!this.props.isUserLoggedIn)  {
          return <Redirect to="/"/>
      }
      return  (
        <div className='center'>
            <Tabs className='home'>
                <TabList>
                    <Tab>Unanswered Questions</Tab>
                    <Tab>Answered Questions</Tab>
                </TabList>
                <TabPanel>
                    <QuestionList isAnswered={false}/>
                </TabPanel>
                <TabPanel>
                     <QuestionList isAnswered={true}/>
                </TabPanel>
            </Tabs>
        </div>)
    }
}

function mapStateToProps({ loggedUser }) {
    return {
        isUserLoggedIn : isUserLoggedIn(loggedUser)
    }
}

export default withRouter(connect(mapStateToProps)(Home))