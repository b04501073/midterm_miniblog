import React from 'react';
import socketIOClient from 'socket.io-client';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.socket = socketIOClient("http://localhost:4040");
        this.state = {
            messages: [],
            messages_toshow: [],
        };
        this.socket.on("allMessage",(all_messages)=>{
            all_messages.forEach(element => {
                this.setState(state => {
                    const n_messages = state.messages.push(element);
                    const m_show = state.messages_toshow
                    return {
                        n_messages,
                        m_show
                    };
                });
            });
        })
    }
    Start_Search = () =>{
        let input_item = document.getElementById('s1')
        let input_value = input_item.value
        this.setState(state => {
            const messages = state.messages;
            const messages_toshow = [];
            return {
                messages,
                messages_toshow
            }
        })
        this.state.messages.forEach(element => {
            this.setState(state => {
                const messages = state.messages;
                const m_show = state.messages_toshow
                if (element.name.match(input_value) || element.message.match(input_value)){
                    m_show.push(element)
                }
                return {
                    messages,
                    m_show
                }
            })
        })
        input_item.value = ''
    }
    render() {
        return (
            <div >
                <input placeholder={"請輸入查詢關鍵字"} className="search_input" id="s1"/>
                <button id="searchicon" onClick={this.Start_Search}><img src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png"></img></button>
                <div className="search_home">
                    <ul>
                        {this.state.messages_toshow.map((item, id) => (
                            <li key={id} className="post_element">
                                
                                <h3>標題: {item.name}</h3>
                                <div className = "post">
                                    {item.message}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
