import React from 'react';

const Input = (props) => {
    // const { className, children, onClick } = props;
    // const extraClass = className || '';
    const socket = props.socket;
    const Submit = ()=>{
        let user_name = document.getElementById("input_title").value
        let message = document.getElementById("input_message").value
        if (user_name !== '' && message !== ''){
            let obj = {
                "name": user_name,
                "message": message
            }
            document.getElementById("input_title").value = ''
            document.getElementById("input_message").value = ''
            socket.emit("message",obj)
        }
        // socket.emit("message")
    }
    return (
        <div className="newpost">
            <h1>新增貼文</h1>
            <h3>標題</h3>
            <input className="postelement" placeholder="請輸入標題" id={"input_title"}/>
            <h3>內容</h3>
            <input className="postelement" placeholder="請輸入內容" id={"input_message"}/>
            <button className="postelement" onClick={Submit} id={"submit_button"}>送出</button>
        </div>
      
    );
};

export default Input;