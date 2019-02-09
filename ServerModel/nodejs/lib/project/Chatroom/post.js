

module.exports ={
    exec : (app,socket)=>{
        module.exports.Atdomain(app,socket)
    },
    Atdomain : (app,socket)=>{
        var user_count = 0;
        var user_list = []
        var io = socket.getValue() // must be

        //當新的使用者連接進來的時候
        io.on('connection', function(socket){
            user_count += 1
            
            //新user
            socket.on('add user',function(msg){
                socket.username = msg;
                user_list.push(socket.username)
                io.emit('add user',{
                    username: socket.username
                });
                // TODO: send data to front-end
                io.emit("user count",user_count)
                io.emit("user list",user_list)
                console.log(`userlist = [${user_list}]`)
            });

            //監聽新訊息事件
            socket.on('chat message', function(msg){
                console.log(socket.username+":"+msg);

                //發佈新訊息
                io.emit('chat message', {
                    username:socket.username,
                    msg:msg
                });
            });

            //left
            socket.on('disconnect',function(){
                console.log(socket.username+" left.");
                user_count -= 1
                for(var i in user_list){
                    if(user_list[i] === socket.username){
                        user_list.splice(i,1)
                    }
                }
                // TODO: send data to front-end
                
                io.emit("user count",user_count)
                io.emit("user list",user_list)
                io.emit('user left',{
                    username:socket.username
                });
            }); 
            socket.on("error",(data)=>{
                console.log("is Error!")
            })               
        });

        app.post("/ObjectModel/project/Chatroom/UserCount",(req,res)=>
        {
            res.send(`${user_count}`)
        })
                    
                
                
    }
}