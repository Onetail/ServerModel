const fs = require("fs")
const path = require("path")

const global = require(path.join(__dirname,"../../../../Assets/global/Global"))
const message = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/message/MessageActivity"))
const mysqldb = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongodb = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))
const socket = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/socket/socket"))

const test = require(path.join(__dirname,"../project/Test/post"))


module.exports = {
    exec:(locatearray,app)=>
    {
        module.exports.domain(locatearray,app)
        module.exports.Atdomain(app)
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

            locatearray[i] = locatearray[i].split("/").splice(
                locatearray[i].split("/").indexOf( 
                    global.Server.SERVERLOCALE.slice(1, global.Server.SERVERLOCALE.length) 
                ),
                locatearray[i].split("/").length
            ).join("/")
            locatearray[i] = "/"+locatearray[i]

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
                
                // case "/test":
                //     app.post("/test",(req,res)=>{
                //         res.send("test")
                //     })
                //     break;
                
                case (locatearray[i].match(/test/) || {}).input:
                    app.post("/test",(req,res)=>{
                        res.send("test success!")
                    })
                    break;

                default :
                    message.message("remind","尚未處理的檔案 : "+locatearray[i])
            }
        }
        return locatearray
    },
    Atdomain:(app)=>
    {
        // print how many project in ObjectModel/project 
        app.post(`${global.Server.SERVERLOCALE}/Package`,(req,res)=>
        {
            var value,
                i,
                data=[]
            
            value = fs.readdirSync(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+global.Server.SERVERLOCALE+ global.Server.SERVERADDRESS))
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
        test.exec({app,mysqldb,mongodb,socket})
    }
}