import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {ProgressBar} from 'react-bootstrap'
import { TiFlag } from 'react-icons/ti'


class ViewPoll extends Component{
   
    render(){
        const { question, user, authedUser}= this.props
        if(!question ){
            return <Redirect to='/404'/>
        }
        const userVoteOptionOne = question.optionOne.votes.length
        const userVoteOptionTwo = question.optionTwo.votes.length
        const totalVotes=userVoteOptionOne+userVoteOptionTwo
        const percentOptionOne=(userVoteOptionOne / totalVotes) * 100
        const percentOptionTwo=(userVoteOptionTwo / totalVotes) * 100
        const questId=question.id
        const voteUser=user[authedUser].answers[questId]
       
        return(
            <div>
               <div className='header'><h3>View Poll</h3></div> 
                <div className='containers'>
                    <form>
                        <div>
                          <div> 
                              <h4>Author : {user[question.author].name}</h4> 
                              <img src={user[question.author].avatarURL}  alt='' className='avatar'/>
                          </div> 
                          <div className='div-progress'>
                                <p style={{textAlign:'left'}}> Would you rather {question.optionOne.text}
                                         {voteUser === 'optionOne' &&  <VotedAnswerFlag />}</p> 
                                    <ProgressBar now={percentOptionOne}/>
                                {userVoteOptionOne} out of {totalVotes} votes
                          </div>
                            <br/>
                           <div className='div-progress'>
                                <p style={{textAlign:'left'}}>Would you rather {question.optionTwo.text}
                                         {voteUser === 'optionTwo' &&  <VotedAnswerFlag />}</p>
                                        <ProgressBar now={percentOptionTwo}/>
                                {userVoteOptionTwo} out of {totalVotes} votes 
                           </div>
                        </div> 
                    </form>
                </div>  
            </div>
        )
    }
}
const VotedAnswerFlag = ()=>(
    <label style={{color:'green'}}>
        <TiFlag className='vote-icon'/>
          You Voted         
    </label>
     
);

function mapStateToProps({authedUser, questions, users},  props){
    const {id} = props.match.params
   const question = questions[id]
   return{
       authedUser,
       user : users,
       question: question
   }
}
export default connect(mapStateToProps)(ViewPoll) 