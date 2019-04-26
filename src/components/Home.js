import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import QuestionList from './QuestionList';


class Home extends Component {
    render() {
      return  ( 
        <div className='center'>
            <Tabs className='home'>
                <TabList >
                    <Tab>Answered</Tab>
                    <Tab>Unanswered</Tab>
                </TabList>

                <TabPanel>
                    <QuestionList isAnswered={true}/>
                </TabPanel>
                <TabPanel>
                    <QuestionList isAnswered={false}/>
                </TabPanel>
            </Tabs>
        </div>)
    }
}

export default Home;