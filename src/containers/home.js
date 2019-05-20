import React, { Component } from "react";
import Message_list from './Message_list';
import socketIOClient from 'socket.io-client';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.socket = socketIOClient("http://localhost:4040");
    }
    clear_all_posts = (e) => {
        this.socket.emit("clear")
    }
    render() {
        return (
            <div className="hamepage">
                <img className="image" src="https://3.bp.blogspot.com/-BRCaFUQfQCU/Wz7eKyQ_kVI/AAAAAAAACXQ/-_fhe9UU_dY3uXzyuuG5m07JnGfYuvn5gCK4BGAYYCw/s680/pexels-photo-842811.jpeg"></img>
                <Message_list socket={this.socket} />
            </div>
        );
    }
}