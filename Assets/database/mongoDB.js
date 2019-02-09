const global = require("../global/Global")
const message = require("../message/MessageActivity")

var value

module.exports = {
    exec : (mongo)=>
    {
        module.exports.init(mongo)
        try{
            module.exports.connect(mongo)
            message.success(2,`MongoDB ${global.Database.MONGODATABASENAME}`)
        }catch(err){
            message.error(2,err)   
        }  
        return mongo
    },
    init : (mongo)=>
    {
        return mongo
    },
    connect : (mongo,method="")=>{

        mongo.MongoClient.connect(`mongodb://${global.Database.DATABASEIP}:${global.Database.MONGOPORT}/`,{ useNewUrlParser: true },(err,db)=>
        {
            module.exports.setValue(db)
            message.message("remind",`this is in mongoDB in ${value}`)
            if(err) throw err
        })
    },
    getValue : ()=>{ return value;},
    setValue : (db)=>{ value = db;}
}