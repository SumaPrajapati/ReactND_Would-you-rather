import React from 'react';

const MessageHistory = props =>{
    const {messages, user} = props;
    return(
        <ul className="message-list">
           {messages.map((message, index)=>(
            <li key={index}
                className={message.username === user.username ? 'message sender' : 'message recipient'}    
            >
                <p>{`${message.username}: ${message.text}`}</p>
            </li>))}
        </ul>
    )
}
export default MessageHistory;
