
const global = require("../../../../../Assets/global/Global")

// this is example project 
module.exports = {
    exec: (app,mysql,mongo,socket)=>{
        module.exports.Atdomain(app,mysql,mongo,socket)
    },
    Atdomain: (app,mysql,mongo,socket)=>{

        app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/Test/index.html",(req,res)=>{
            res.send("hahaha")
        })
    }
}