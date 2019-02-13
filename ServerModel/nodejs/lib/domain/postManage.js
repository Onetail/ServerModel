const fs = require("fs")
const path = require("path")

const global = require(path.join(__dirname,"../../../../Assets/global/Global"))
const message = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/message/MessageActivity"))
const mysqldb = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongodb = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))
const socket = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/socket/socket"))

const Test = require(path.join(__dirname,"../project/Test/post"))
module.exports = {
    exec:(locatearray,app,indexarray)=>
    {
        module.exports.domain(locatearray,app)
        module.exports.Atdomain(indexarray,app)
    },
    domain:(locatearray,app)=>
    {
        let i,
            max;
        var mysql = mysqldb.getValue()
        
        for(i = 0,max=locatearray.length;i<max;i++) // search all address to make url search
        {
            let endlocate,
                startlocate;
            endlocate = locatearray[i].split("/")[locatearray[i].split("/").length-1]
            startlocate = locatearray[i].slice(0,locatearray[i].length - locatearray[i].split("/")[locatearray[i].split("/").length-1].length)
            locatearray[i] = locatearray[i].slice(5)
            // message.message("test",locatearray[i])  
            switch(locatearray[i])
            {
                case "/ObjectModel/project/LoginFrame/action.html":
                    app.post(locatearray[i],(req,res)=>
                    {
                        // res.header("Content-Type", "application/json; charset=utf-8")
                        var post_payload = req.body
                        res.sendFile(endlocate,{root:startlocate})
                        message.message("test",post_payload.act)
                        message.message("test",post_payload.pwd)
                        mysql.query("show DATABASES;",(err,results,fields)=>
                        {
                            if(err)throw err;
                            message.message("obj",results)
                        })
                    })    
                    break;

                    
                default :
                    message.message("remind","尚未處理的檔案 : "+locatearray[i])
            }
        }
    },
    Atdomain:(indexarray,app)=>
    {
        // print how many project in ObjectModel/project 
        app.post("/ObjectModel/Package",(req,res)=>
        {
            var value,
                i,
                data=[]
            
            value = fs.readdirSync(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/ObjectModel/project"))
            value.forEach((d)=>
            {
                var gnore = false;

                // check gnore 
                for(let i = 0 ; i < global.POSTFILEENDWITH.length ; i++){
                    if(d == global.POSTFILEENDWITH[i]){
                        gnore = true 
                    }
                }
                if(!gnore)data.push({data:d})
            })
            res.send(data)
        })
        
        // TODO: add your project 
        Test.exec(app,mysqldb,mongodb,socket)
    }
}