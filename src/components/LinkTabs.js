import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class LinkTabs extends Component{

    render(){
         const { authedUser, user}= this.props
          const { avatarURL }= user[authedUser]
          const {name} = user[authedUser]
        return(
            <div>
                <div className='App-header'>
                   <h2>Would you rather</h2> 
                   <Link  to='/'>Home</Link>  
                   <Link  to='/add'>NewQuestion</Link>
                   <Link  to='/leaderboard'>LeaderBoard</Link> 
                        <div> Hi, Welcome
                           <img src={avatarURL} alt='' className='avatar'/>{name}
                        </div> 
                   <Link onClick={()=> this.props.setAuthedUser(null)} to='/'>Logout</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions }, {id}){
    const  question = questions[id]
    return {
        authedUser,
        question:question,
        user: users
    }
}  

export default connect(mapStateToProps, { setAuthedUser })(LinkTabs)