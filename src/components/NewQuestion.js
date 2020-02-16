import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            option1 : '',
            option2 : '',
            toHome : false
        }
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) =>{
        this.setState({[e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
         const {option1, option2} = this.state;
         const {dispatch, authedUser}= this.props
         dispatch(handleAddQuestion(option1, option2, authedUser))
         this.setState(() => ({
              toHome: true
         }))
    }

    render(){
        const {authedUser, users} = this.props
        const user= users[authedUser]
        const {option1, option2, toHome } = this.state
            if(toHome === true){
                 return <Redirect to='/'/>
            }

        const hidden =  option1 === '' || option2 === '' ? true : false
        return(
            <div className='div-header'>
                <div className='header'><h3 >New Question</h3></div>
                <div className='containers'>
                    <img src={user.avatarURL} alt="" className='avatar'/> 
                       <div className='questions-info'>
                            <div>
                            <h4>Author:{user.name}</h4> 
                            </div>
                          <div className='form-view'>
                                <p style={{textAlign:'left',fontSize:18, fontWeight: 'bold', marginLeft:'95px'}}> would you rather</p>
                                    <div>
                                        <input 
                                        id='option1'
                                        className='input-view'
                                        value={option1}
                                        placeholder='Enter text for option one'
                                        onChange={this.handleChange} />
                                    </div> 
                                        or
                                    <div>
                                        <input
                                        id='option2' 
                                        className='input-view' 
                                        value={option2}
                                        placeholder='Enter text for option two'
                                        onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <button className='button' disabled={hidden} onClick={this.handleSubmit}>Submit</button> 
                                    </div> 
                            </div>
                       </div>
                </div>
            </div>
        )
    }
}

  function mapStateToProps({authedUser, users}){ 
    return {
        authedUser,
        users
    }
} 

export default connect(mapStateToProps)(NewQuestion) 