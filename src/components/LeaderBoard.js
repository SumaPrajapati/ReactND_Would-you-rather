import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

class LeaderBoard extends Component{
    state={
        deps: ''
    }
    render(){
        const { UserID} = this.props

        return(
            <div className="div-header">
               <div className='header'><h3> LeaderBoard</h3></div> 
               <div className='containers'>
               <Table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Questions Created</th>
                            <th>Questions Answered</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserID.map((user, index)=>( 
                                <tr key={user.id}> 
                                    <td>{index + 1 }</td>
                                    <td style={{textAlign:'left'}}><img src={user.avatarURL} alt='' className='avatar'/>{user.name}</td>
                                    <td>{user.totalQuestion}</td>
                                    <td>{user.totalAnswer}</td>
                                    <td>{user.score}</td>
                                 </tr>
                      ))}  
                    </tbody>
                   </Table>
               </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users}){
    console.log('AUTHORIED USER1', Object.values(users))
  
    const UserIDs = Object.values(users).map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      totalQuestion: user.questions.length,
      totalAnswer: Object.values(user.answers).length,
      
      score: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.score - b.score).reverse() 
  
     return{
         authedUser,
         UserID : UserIDs
     }
}

export default connect(mapStateToProps)(LeaderBoard)