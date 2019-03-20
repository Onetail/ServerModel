const Global = require("../../../../../Assets/global/Global")

module.exports = {
    exec:(app,mongodb,socket)=>{
        module.exports.Atdomain(app,mongodb,socket)
    },
    Atdomain:(app,mongodb,socket)=>
    {
        var Collection_Name = "User_Detail"
        var Database_Name = "WorkSchedule"
        var UID = 9
        
        // TODO: this whether use Placard
        var isPlacard = false

        // RegisterActivity 
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/UserRegister",(req,res)=>{
            var post_payload = req.body,
                mongo = mongodb.getValue(),
                savedate = getNowTime()
        
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password,logintype:post_payload.logintype},(err,result)=>{
                if(err)throw err 
                if(result === null){
                    mongo.db(Database_Name).collection(Collection_Name).insertOne({account:post_payload.account,password:post_payload.password,logintype:post_payload.logintype,UID:UID,buildtime:savedate},(err2,result2)=>{
                        if(err2)throw err2 
                        if(result2 !== null){
                            res.send(true)
                        }else res.send(false)
                    })
                }
                else res.send(false)
            })
        })
        // LoginActivity
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/UserLogin",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue() 
            
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password,logintype:post_payload.logintype},(err,result)=>{
                if(err) throw err 
                console.log(`login database is ${result}`)
                if(result == null)res.send(false)
                else res.send(true)
            })
        })
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/UserDetail",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password,logintype:post_payload.logintype},(err,result)=>{
                if(err) throw err 
                if(result == null)res.send(false)
                else res.send(result)
            })
        })
    
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/UserInsertName",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            
            mongo.db(Database_Name).collection(Collection_Name).find().sort({UID:-1}).limit(1).toArray((err, result)=> {
                if(err) throw err 
                if(result[0].UID != UID-1) UID = result[0].UID + 1
                mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,password:post_payload.password},{$set:{name:post_payload.name,UID:UID}},(err,result)=>{
                    if(err)throw err
                    if(result!==null){
                        UpdateDateTotal(post_payload)
                        res.send(true)
                    }
                    else res.send(false)
                })
            })
        })
        // 確認是否填寫過 名稱
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/UserCheckExistName",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password},(err,result)=>{
                if(err) throw err 
                if(result.name === undefined)res.send(false)
                else res.send(result.name)
            })
        })

        // 月曆 增加 記事
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/CalendarAddEvent",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password,logintype:post_payload.logintype},(err,result)=>{
                if(err) throw err 
                if(result !== null){
                    AddDateEvent(post_payload)
                    res.send(true)
                }
                else res.send(false)
            })
            
        })
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/CalendarGetEvent",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).find({eventDate:post_payload.eventDate,type:"event"}).toArray((err, result)=> {
                if(err)throw err 
                res.send(result)
            })
        })
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/CalendarSetState",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue() 
            var savedate = getNowTime()  
            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).updateOne({title:post_payload.title,
                content:post_payload.content,
                eventDate:post_payload.eventDate,
                eventTime:post_payload.eventTime},{$set:{finishState:post_payload.finishState,finishDate:savedate}},(err,result)=>{
                if(err) throw err 
                if(result == null) res.send(false)
                else {
                    
                    if(post_payload.finishState == 223)UpdateDateTotal(post_payload,"SUCCESS")
                    else if(post_payload.finishState == 224) UpdateDateTotal(post_payload,"ERROR")
                    res.send(true)
                }

            })
        })
        app.post(Global.Server.SERVERLOCALE+"/"+Database_Name+"/CalendarCancelEvent",(req,res)=>{
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).remove({title:post_payload.title,content:post_payload.content,buildDate:post_payload.buildDate},(err,result)=>{
                if(err)throw err 
                if(result == null)res.send(false)
                else {
                    res.send(true)
                    UpdateDateTotal(post_payload,"CANCEL")
                }
            })
        })


        // TODO: Calendar method
        function AddDateEvent(post_payload,type = "event"){
            var mongo = mongodb.getValue()   

            var savedate = getNowTime()
        
            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).insertOne({title:post_payload.title,content:post_payload.content,eventDate:post_payload.eventDate,buildDate:savedate,
                finishDate:null,
                finishState:post_payload.finishState,
                type:type,
                eventTime:post_payload.eventTime},(err,result)=>{
                if(err) throw err 
                if(result !== null){
                    UpdateDateTotal(post_payload)
                }
            })
        }
        function UpdateDateTotal(post_payload,type = "NULL"){
            var mongo = mongodb.getValue()   
            
            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).findOne({type:"total"},(err,result)=>{
                if(err)throw err 
                if(result == null){
                    mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).insertOne({ID:0,type:"total",success:0,error:0,cancel:0})
                }else{
                    var number = result.ID ,
                        success = result.success,
                        error = result.error ,
                        cancel = result.cancel
                        
                    switch(type){
                        case "NULL":
                            number += 1
                            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).update({type:"total"},{$set:{ID:number,type:"total"}})
                            break
                        case "SUCCESS":
                            success += 1
                            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).update({type:"total"},{$set:{ID:number,type:"total",success:success}})
                            break
                        
                        case "ERROR":
                            error += 1 
                            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).update({type:"total"},{$set:{ID:number,type:"total",error:error}})
                            break
                        case "CANCEL":
                            cancel += 1 
                            mongo.db(Database_Name).collection(`${post_payload.logintype}_${post_payload.account}_CalendarEvent`).update({type:"total"},{$set:{ID:number,type:"total",cancel:cancel}})
                            break

                    }
                }
            })
        }
        function getNowTime(){
            var date = new Date(),
                savedate = date.getFullYear() + "/" + (date.getMonth()+1) + "/" +date.getDate() + " " + date.getHours() + ":" +date.getMinutes() + ":"+date.getSeconds()
            return savedate
        }
    }
}

