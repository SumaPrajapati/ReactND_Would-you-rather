import React,{Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LinkTabs from './LinkTabs'
import LoadingBar from 'react-redux-loading'
import LoginPage from './LoginPage'
import NewQuestion from './NewQuestion'
import HomePage from './HomePage'
import LeaderBoard from './LeaderBoard'
import LogOut from './LogOut'
import ViewQuestion from './ViewQuestion'
import PageNotMatch from './PageNotMatch'
import ViewPoll from './ViewPoll'
import '../index.css';

 class App extends Component{
   componentDidMount(){
     this.props.dispatch(handleInitialData())
   }
   render(){
    const { authedUser } = this.props
    console.log(authedUser)
    if(authedUser === null) {
      return (
        <Router>
          <Switch>
            <Route path='/' component={LoginPage} /> 
          </Switch>
        </Router>
      )
    }
    
    return(
    <Router>
      <div>

       <Fragment>
              <LoadingBar />
               <LinkTabs/>
                 <Switch>
                          <Route exact path='/'  component={HomePage}/> 
                          <Route path='/add' component={NewQuestion} />
                          <Route path='/questions/:id' component={ViewQuestion} /> 
                          <Route path='/answers/:id' component={ViewPoll}/> 
                          <Route path='/leaderboard' component={LeaderBoard}/>
                          <Route path='/logout' component={LogOut}/>
                          <Route path='/404' component={PageNotMatch} />
                        </Switch>
                   
            </Fragment>
          </div>
    </Router> 

      );
    }
   }
  

function mapStateToProps({authedUser}){
  return{
     authedUser
  }
}

export default connect(mapStateToProps)(App);

