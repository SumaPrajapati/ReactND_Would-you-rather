import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {formatDate} from '../utils/_DATA'


class Questions extends Component{
    state={
       toShow: false
    }
    
    handleSubmit = (e) =>{
        e.preventDefault()
        
        this.setState(()=>({
            toShow : true 
        }))
    }

    render(){
        const { authedUser, users, question, id}= this.props
        if(this.state.toShow === true ){
            if(!this.props.answerFlag){
                return <Redirect to={`/questions/${id}`}/>
            }else{
                return <Redirect to={`/answers/${question.id}`}/> 
            }
          } 
        return(
            <div className="questions">
               <img 
                  src={users[question.author].avatarURL}
                  alt=""
                  className='avatar'/>
                  <div className='question-info'>
                        <div className=''>
                              <h4>{users[question.author].name} asks {moment(formatDate(question.timestamp), 'YYYYMMDD').fromNow()}</h4>
                        </div>
                        <div>
                            <p style={{fontSize: 20, fontWeight: 'bold'}}>Would you rather...</p>
                        </div>
                        <div> 
                            <p>{question.optionOne.text}</p> 
                            
                            <p>{question.optionTwo.text}</p>  
                        </div>
                        <div>     
                            <button className='button' onClick={this.handleSubmit}>Display</button> 
                        </div> 
                  </div>    
            </div>
        )
    }
}
function mapStateToProps({authedUser, questions, users}, {id}){
   const question = questions[id]
    return{
      authedUser,
      users: users,
      question : question
    }
}
export default connect(mapStateToProps)(Questions)