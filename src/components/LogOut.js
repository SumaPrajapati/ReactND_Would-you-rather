import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class LogOut extends Component{
     logout = () =>{
        this.props.setAuthedUser(null)
    } 
     
    render(){
          return(
              <div>Logout</div>
          )  
    }
}
export default connect(null,{setAuthedUser})(LogOut) 