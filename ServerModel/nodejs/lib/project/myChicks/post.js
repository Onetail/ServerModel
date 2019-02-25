

module.exports = {
    exec: (app,mysqldb,mongodb,socket)=>
    {
        module.exports.Atdomain(app,mysqldb,mongodb,socket)
    },
    Atdomain:(app,mysqldb,mongodb,socket)=>
    {
        
        var Collection_Name = "User_Detail"
        var Database_Name = "myChicks"
        var isPlacard = true
        // TODO myChicks app 
        app.post("/ObjectModel/myChicks/UserRegister",(req,res)=>
        {
            var post_payload = req.body 
            var mongo = mongodb.getValue()
            
            mongo.db(Database_Name).collection(Collection_Name).insertOne({account:post_payload.account,password:post_payload.password,type:post_payload.type,money:post_payload.money,pet:null},(err,result)=>
            {
                if(err) throw err 
                if(result === null)res.send(false)
                else res.send(true)
            })
        })
        app.post("/ObjectModel/myChicks/UserCheckIsExist",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()
            
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                if (err) throw err 
                // false = database not have this data , so build
                if(result === null)res.send(false)
                else res.send(true)
            })
        })
        app.post("/ObjectModel/myChicks/UserLogin",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,password:post_payload.password,type:post_payload.type},(err,result)=>
            {
                var datalist = []
                if(err) throw err 
                if(result === null)res.send(false)
                else 
                {
                    datalist.push({
                        account:result.account,
                        money: result.money,
                        type: result.type,
                    })
                    var json  = JSON.stringify(datalist)
                    res.send(datalist)
                }
            })
        })
        
        // myChicks app gamebox
        app.post("/ObjectModel/myChicks/PetIsExist",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                if(err)throw err
                if(result.pet === null)res.send(false)
                else {
                    res.send(result)
                }
            })
        })
        app.post("/ObjectModel/myChicks/PetNewInsert",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()    
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                var number = 0 
                if(err)throw err 
                if(result.petnumber === undefined)number+=1 
                else{
                     number = result.petnumber
                     number +=1
                }
                var time=new Date();
                var json = JSON.parse(JSON.stringify(post_payload.pet))
                var pettime = `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 ${time.getHours()}時${time.getMinutes()}分${time.getSeconds()}秒`
                json.buildtime = pettime
                console.log(json)
                mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,type:post_payload.type},{$set:{petnumber:number,pet:json}},(err2,result2)=>
                {
                    if(err2)throw err2
                    if(result2 === null)res.send(false)
                    else res.send(true)
                })    
            })
        })
        app.post("/ObjectModel/myChicks/UserDetail",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()    
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                if(err) throw err 
                if(result == null)res.send(false)
                else res.send(result)
            })
        })
        app.post("/ObjectModel/myChicks/PetSetAttributes",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()    
            mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,type:post_payload.type},{$set:{pet:post_payload.pet}},(err,result)=>
            {
                if(err) throw err 
                if(result == null)res.send(false)
                else res.send(result)
            })
        })
        app.post("/ObjectModel/myChicks/UserBuySelling",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()    
            mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,type:post_payload.type},{$set:{money:post_payload.money}},(err,result)=>
            {
                if(err) throw err 
                console.log(`buy = ${result}`)
                if(result == null)res.send(false)
                else res.send(true)
            })
        })
        /* 
        *   TODO : selling page to know price and selling pet 
        */
        app.post("/ObjectModel/myChicks/PetPrice",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()    
            var price = 0
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                if(err) throw err 
                var userpet = JSON.parse(JSON.stringify(result.pet))
                userpet.JUS >= 0 ? price += parseInt((userpet.JUS / 50))*2 : price -= parseInt((userpet.JUS / 20))*2
                userpet.HOM >= 0 ? price += parseInt((userpet.HOM / 50)) : price -= parseInt((userpet.HOM / 30))
                userpet.HAP >= 0 ? price += parseInt((userpet.HAP / 50)) : price -= parseInt((userpet.HAP / 25))
                res.send(`${price}`) 
            })
        })
        app.post("/ObjectModel/myChicks/PetSelling",(req,res)=>
        {
            var post_payload = req.body
            var mongo = mongodb.getValue()   
            var money = 0
            mongo.db(Database_Name).collection(Collection_Name).findOne({account:post_payload.account,type:post_payload.type},(err,result)=>
            {
                if(err) throw err 
                if(result !=null) {
                    money = result.money
                    money += post_payload.money
                    mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,type:post_payload.type},{$set:{money:money}},(err2,result2)=>
                    {
                        if(err2) throw err2
                        if(result2 == null) res.send(false)
                        else {
                            mongo.db(Database_Name).collection(Collection_Name).update({account:post_payload.account,type:post_payload.type},{$set:{pet:null}},(err3,result3)=>
                            {
                                if(err3)throw err3 
                                if(result3 == null) res.send(false)
                                else res.send(true)
                            })
                        }
                    })
                }
                
            }) 
        })
        app.post("/ObjectModel/myChicks/GamePlacard",(req,res)=>
        {
            var title = "1"
            var msg = "2"
            var result = JSON.stringify("")
            if(isPlacard){
                result = `{"title":${title},"msg":${msg}}`
                console.log(result)      
            }
            res.send(result)
        })

    }
}