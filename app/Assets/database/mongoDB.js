const global = require("../global/Global")
const message = require("../message/MessageActivity")

var value

module.exports = {
    exec : async (mongo)=>
    {
        module.exports.init(mongo)
        try{
            await module.exports.connect(mongo)
            message.success(2,`MongoDB Port ${global.Database.MONGOPORT}`)
        }catch(err){
            message.error(2,err)   
        }  
        return mongo
    },
    init : (mongo)=>
    {
        return mongo
    },
    connect : async (mongo,method="")=>{

        await mongo.MongoClient.connect(`mongodb://${global.Database.DATABASEIP}:${global.Database.MONGOPORT}/`,{ useNewUrlParser: true },async (err,db)=>
        {
            if(err) throw err
            await module.exports.setValue(db)
            message.message("remind",`this is in mongoDB in ${value}`)
        })
    },
    getValue : ()=>{ return value;},
    setValue : (db)=>{ value = db;}
}