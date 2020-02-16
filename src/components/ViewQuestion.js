import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleAddAnswersQuestions} from '../actions/questions'
import {Redirect} from 'react-router-dom'


class ViewQuestion extends Component{
    constructor(props){
        super(props);
        this.state ={
        answerOption:'',
                toDisplay: false
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleChange = (e) => {
        this.setState({
            answerOption : e.target.value
        })
    }

    handleClick = (e) =>{
       e.preventDefault()
       const answer = this.state.answerOption
       const { authedUser, question, dispatch} = this.props
       dispatch(handleAddAnswersQuestions(authedUser,question.id, answer))
     
        this.setState(()=>({
            toDisplay: true 
        }))  
    }

    render(){
        const { answerOption } = this.state
        const {authedUser, users, question} = this.props
        const user = users[authedUser]
          if(this.state.toDisplay===true){
            return  <Redirect to={`/answers/${question.id}`}/>
          }
         
          if(!question){
              return <Redirect to='/404'/>
          }
        const hidden = answerOption === '' ? true : false 
        return(
            <div className='div-header'>
               <div className='header'><h3>View Question</h3></div> 
                <div className='containers'> 
                   <form>
                       <img src={user.avatarURL} alt='' className='avatar'/>
                       
                        <h4>Author by:{user.name}</h4>
                        <div className='form-view'>
                            <p style={{textAlign:'left',fontSize:20, fontWeight: 'bold'}}> would you rather</p>
                                <div className='input-radio'>
                                    <input type='radio' name='answerOption'
                                            value='optionOne' 
                                            selected={answerOption === 'optionOne'} 
                                            onChange={this.handleChange}/> {question.optionOne.text} 
                                </div>
                                <br/>
                                <div className='input-radio'>      
                                    <input type='radio' name='answerOption'
                                            value='optionTwo' 
                                            selected={answerOption === 'optionTwo'} 
                                            onChange={this.handleChange}/> {question.optionTwo.text}
                                </div> 
                                <div>
                                    <button className="button" disabled={hidden} onClick={this.handleClick}>Submit</button>
                                </div>  
                        </div>
                   </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props){ 
    const {id}= props.match.params
    const question = questions[id]
    console.log('Tday input question5', questions, question )
    return{
        authedUser,
        question: question,
        users
        }
}
export default connect(mapStateToProps)(ViewQuestion)