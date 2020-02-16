import React, {Component} from 'react'
import {connect} from 'react-redux'
import Questions from './Questions'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
           tIndex: 0,
           questCount : 0
        };
    }
    render(){
        const { unanswered, answered } = this.props
        return(
            <div className="div">
               <div className='header'><h3>Home</h3> </div>
                 <div className='containers'>
                    <Tabs className="" selectedIndex={this.state.tIndex} 
                                       onSelect={tIndex => this.setState({tIndex})}>
                        <TabList>
                            <Tab>Unanswered Questions </Tab>
                            <Tab>Answered Questions</Tab>
                        </TabList>
                        <TabPanel>
                            <div>
                               <ul>{unanswered.map((question)=>(
                                   <li key={question.id}>
                                       <Questions id={question.id} 
                                                 answerFlag={false} 
                                         />
                                   </li>
                               ))}
                               </ul>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <ul>{answered.map((question) => (
                                        <li key={question.id}>
                                            <Questions id={question.id} 
                                                       answerFlag={true}
                                             />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>  
            </div>
        )
    }
}
function mapStateToProps({authedUser, questions, users}){
     const questionIds = Object.values(questions)  
     const answeredIds = Object.keys(users[authedUser].answers)
      
const unanswered = Object.values(questions)
                    .filter(question => !answeredIds.includes(question.id))
                    .sort((a,b) => b.timestamp - a.timestamp)
                   
const answered = questionIds.filter(question => answeredIds.includes(question.id))
                            . sort((a,b) => b.timestamp - a.timestamp)         
     return{
            unanswered,
            answered
     }
}
 export default connect(mapStateToProps)(HomePage)
   
