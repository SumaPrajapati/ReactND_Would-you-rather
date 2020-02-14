import React, {Component} from 'react';

class AddMessage extends Component{
    state= {
        message: '',
    };

    inputChange = event=>{
        const {value} = event.target;
        this.setState(() => ({
            message : value, 
        }));
    };

    handleSubmit = event =>{
        event.preventDefault();
        this.props.onHandleMessage(this.state.message);
    }
     
    isDisabled = () => {
        const {message} = this.state;
        return message === '';
    }

    render(){
        const {message} = this.state;
        return (
            <div>
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input 
                      className="form-control"
                      type="text"
                      value={message}
                      placeholder="Enter your Message"
                      onChange={this.inputChange}
                    />
                    <button className="btn submit-button" disabled={this.isDisabled()}>Send</button>
                </form>
            </div>
        )
    }
}

export default AddMessage;