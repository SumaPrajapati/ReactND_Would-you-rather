import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ChatWindow from'./ChatWindow';

const users =[{username: 'Suma'}, {username: 'Dhan'}];

class App extends Component{
  state={
    messages : [],
  }
  onMessage = (username, massage) =>{
    const newMessage = {
      ['username']: username,
      ['text']: massage,
    };
    this.setState( currentState =>({
       messages: currentState.messages.concat([newMessage]),
     
    }))
  }

  render(){
    const { messages } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Chat Application</p>
        </header>
        <div  className="container">
               {users.map(user => 
               <ChatWindow key={user.username} 
                user={user} 
                messages={messages} 
                onMessage={this.onMessage}/>)}
        </div>
      
      </div>
    );
  }
}

export default App;
