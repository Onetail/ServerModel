const app = require("express")();

const bodyparser = require("body-parser")
const mysql  = require("mysql")
const mongo = require("mongodb")
const fs = require("fs")
const path = require("path")

const global = require(path.join(__dirname,"../../../../Assets/global/Global"))
const socket = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/socket/socket"))
const mysqlDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongoDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))
const filepath = require(path.join(__dirname,"../path/Filepath"))
const message = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/message/MessageActivity"))
const pm = require(path.join(__dirname,"./postManage"))
const gm = require(path.join(__dirname,"./getManage"))


var HttpsKey =  {
    key: fs.readFileSync(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/https/private.key"),"utf8"),
    cert: fs.readFileSync(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/https/certificate.crt"),"utf8")
}

const https = require("https").createServer(HttpsKey,app)
const http = require("http").createServer(app)
const ios = require("socket.io")(https) // not finished
const io = require("socket.io")(http) 


module.exports = {
    exec:()=>
    {
        let locatearray;    // to save file cwd in directory 
        // app.set('etag',false)
        app.use(bodyparser())

        module.exports.databaseMethod()
        module.exports.socketMethod()
        
        filepath.exec(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+""+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS)) // to get all project file path
        filepath.exec(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/images")) // this not in ObjectModel / directory
        filepath.exec(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/ObjectModel/locate/assets")) // directory
        locatearray = filepath.getLocate()
        module.exports.getMethod(locatearray,1)
        module.exports.getMethod(locatearray,2) 
        locatearray.length = 0 
        locatearray = filepath.postLocate()
        module.exports.postMethod(locatearray) 

        module.exports.getMethodDefaultPage()
    },
    // to form use http get 
    getMethod: (locatearray,type)=> {type == 1 ? gm.exec(locatearray,app): gm.Atdomain(locatearray,app)},
    // to form use http post 
    postMethod:(locatearray)=> {pm.exec(locatearray,app)},
    getMethodDefaultPage:()=>{
        gm.defaultPage(app)    },
    databaseMethod: ()=>
    {
        var mysql_connection , 
            mongo_connection
        mysql_connection = mysqlDB.exec(mysql_connection,mysql)
        mysqlDB.setValue(mysql_connection)

        mongo_connection = mongoDB.exec(mongo)
        return mysql_connection,mongo_connection
    },
    socketMethod:()=>
    {
        socket.exec(io)
        message.success(3)
        
    },
    listen:()=>{
        http.listen(global.Server.SERVERHTTPPORT,()=>{message.success(1,global.Server.SERVERHTTPPORT)})
        https.listen(global.Server.SERVERHTTPSPORT,()=>{message.success(1,global.Server.SERVERHTTPSPORT)})
    },
}