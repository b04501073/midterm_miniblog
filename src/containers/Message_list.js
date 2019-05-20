import React from 'react';

class Message_list extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages: [
            ],
        };
        this.socket = props.socket
        this.socket.on("allMessage",(all_messages)=>{
            all_messages.forEach(element => {
                this.setState(state => {
                    const n_messages = state.messages.push(element);
                    return {
                        n_messages,
                    };
                });
            });
        })
        this.socket.on("newMessage",(n_message)=>{
            this.setState(state => {
                const n_messages = state.messages.push(n_message);
                return {
                    n_messages,
                };
            });
        })
        this.socket.on("cleared",()=>{
            this.setState({messages: []});
        })
    }

    onAddItem = (n_message) => {
        this.setState(state => {
            const n_messages = state.messages.push(n_message);
            return {
                n_messages,
            };
        });
    };
    
    clear_all_posts = () => {
        this.socket.emit("clear")
    }
    render() {
        
        return(
            <ul>
                {this.state.messages.map((item, id) => (
                    <li key={id} className="post_element">
                        
                        <h3>標題: {item.name}</h3>
                        <div className = "post">
                            {item.message}
                        </div>
                    </li>
                ))}
                <button className="clear_btn" onClick={this.clear_all_posts}>Clear all</button>
            </ul>
        )
    }
}

export default Message_list;