import Input from "./Input"
import React from 'react';
import socketIOClient from 'socket.io-client';

export default class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.socket = socketIOClient("http://localhost:4040");
    }
    render() {
        return (
            <div>
                <Input socket={this.socket}/>
            </div>
        );
    }
}