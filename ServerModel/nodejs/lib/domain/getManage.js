const path = require("path")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))
const message = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/message/MessageActivity"))
const db = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongodb = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))

module.exports = {
    exec:(array,app)=>{module.exports.domain(array,app)},
    domain:(array,app)=>
    {   
        
        for(let i = 0,max=array.length;i<max;i++) // search all address to make url search
        {
            let endlocate,
                startlocate,
                gnore = false;

            endlocate = array[i].split("/")[array[i].split("/").length-1]
            // check gnore 
            for(let i = 0 ; i < global.POSTFILEENDWITH.length ; i++){
                if(endlocate == global.POSTFILEENDWITH[i]){
                    gnore = true 
                }
            }
            
            // add gnore file in global for Http Get method
            if(!gnore){
                startlocate = array[i].slice(0,array[i].length - array[i].split("/")[array[i].split("/").length-1].length)
                array[i] = encodeURI(array[i].slice(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"").length))
                // message.message("run",array[i])
                try
                {
                    app.get(array[i],(req,res)=>
                    {
                        res.sendFile(endlocate,{root:startlocate})
                    })
                }catch(err){message.error(1,err)}
            }
        }
    },
    Atdomain:(array,app)=>
    {
        // locate address 
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/",(req,res)=>
        {
            res.sendFile("locate.html",{root:"../../ObjectModel/locate/"})
        })
        // https address
        app.get("/.well-known/acme-challenge/2PstEktjN5T8R_JQwcOY_RrJ9Ki_asJhTpih7S-s04Y",(req,res)=>{
            res.send("2PstEktjN5T8R_JQwcOY_RrJ9Ki_asJhTpih7S-s04Y.AAdaTX30-mFwJx084cG_TUgiJsT_zXWpSX8QVPfBrVA")
        })
        // socket io 
        // app.get("/socket.io/socket.io.js",(req,res)=>{
        //     res.sendFile("socket.io.js",{root:"../../Assets/socket/"})
        // })
        // app.get("/socket.io/socket.io.js.map",(req,res)=>{
        //     res.sendFile("socket.io.js.map",{root:"../../Assets/socket/"})
        // })
        
    },
    defaultPage: (app)=>{
        
        //  TODO: if user default , do this 
        
        app.get("*",(req,res)=>
        {
            res.sendFile("default.html",{root:"../../Assets/default/"})
        })
    }
}