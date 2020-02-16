import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
          sUser : '',
          message:'',
          loggedIn: false
        }
         this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange = (e) => {
        this.setState({
           sUser: e.target.value
        });
     }

     handleClick = (e) => {
         const {setAuthedUser} = this.props
         e.preventDefault();
         if(this.state.sUser){
            console.log("LoginUser15", this.state.sUser);
            this.setState({
                loggedIn : true
            })
          setAuthedUser(this.state.sUser)
         } 
     }
    
      render(){
        const { users} = this.props 
        if(this.state.loggedIn){
            return <Redirect to='/' />
        }
        return(
            <div>
                <div className="App-header"><h1>Would You Rather</h1></div>
                <div className='div-header' >
                   <div className='header'><h3 >Log In Your Account</h3></div>
                     <form>
                        <div className='containers'>
                                <div>
                                    <select className='' value={this.state.sUser} onChange={this.handleChange}>
                                        <option defaultValue='selectUser'>Select a user</option> 
                                        {Object.values(users).map((user)=>(<option key={user.id} value={user.id}>
                                        {user.name}</option>))}
                                    </select>
                                </div>
                                <div>
                                     <p>Select the user from above arrow and <br/>
                                        then click login button
                                     </p>
                                </div>
                                <div>
                                     <button className='button' onClick={this.handleClick}>Login</button>
                                </div>      
                        </div>
                     </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }){
    console.log("State USERS", users)
    return{
        authedUser, 
        users
        }
}

export default connect(mapStateToProps, {setAuthedUser})(LoginPage)