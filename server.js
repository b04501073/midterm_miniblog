const Message = require('./src/containers/message')
const mongoose = require('mongoose')

var app = require("express")();

var https = require('http').Server(app)

https.listen(4040)

var io = require("socket.io")(https)

var messages = [
    {name: "期末快到了", message: "心好累"}
]


mongoose.connect('mongodb+srv://Max:Max12345@cluster0-7kktv.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})



db.once('open', () => {
    console.log('MongoDB connected!')
    // const message1 = new Message({ name: "test1 ", message : "ttttt"})
    // message1.save(err => {
    //     if (err) console.error(err)
    // })
    io.on('connection', socket => {

        // First time running
        Message.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                // console.log(res)
                socket.emit('allMessage', res)
            })

        socket.on('message', data => {
            let name = data.name
            let body = data.message
            

            const message = new Message({ name: name, message : body})
            // console.log(message)
            message.save(err => {
                if (err) console.error(err)

                io.emit('newMessage', data)
            })
        })

        socket.on('clear', () => {
            // console.log("clearing")
            // Remove all chats from collection
            Message.deleteMany({}, () => {
                // Emit cleared
                io.emit('cleared')
            })
        })
    })
})
// app.get('/', function(req, res){
//     res.send("hello");
// })

// io.on("connection", function(socket){
//     socket.emit("allMessage", messages)
//     socket.on("message", (obj)=>{
//         messages.push(obj)
//         console.log(obj.name+": ", obj.message)
//         io.emit("newMessage", obj)
//     })
// })

