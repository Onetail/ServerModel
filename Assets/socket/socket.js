const message = require("../message/MessageActivity")

var value = ""
module.exports = {
    exec : (io)=>{module.exports.setValue(io)},
    Connect:(io)=>
    {
        io.on("connection",(socket)=>
        {
            message.success(3)
            module.exports.disConnect(socket)
        })
        module.exports.setValue(io)
    },
    disConnect:(socket)=>
    {
        socket.on("disconnect",()=>{message.message("remind","Disconnect socket.io")})
    },
    getValue : () =>{return value},
    setValue : (io)=>{value =  io}
}