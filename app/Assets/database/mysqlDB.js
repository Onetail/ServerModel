const global = require("../global/Global")
const message = require("../message/MessageActivity")

var value = "";
module.exports = {
    exec : async (mysql)=>
    {
        try{
            connection = await module.exports.init(mysql)
            await module.exports.connect(connection)
            message.success(2,global.Database.MYSQLDATABASENAME)
            await module.exports.setValue(connection)
            message.message("remind",`this is in mysqlDB in ${connection}`)
        }catch(err){
            message.error(2,err)   
        }  
    },
    init : (mysql,database = global.Database.MYSQLDATABASENAME)=>
    {
        return mysql.createConnection({
            host: global.Database.MYSQLDATABASEIP,
            user: global.Database.DATABASEUSER,
            password : global.Database.DATABASEPASSWORD,
            database : database
        })
    },
    connect : (connection)=>{connection.connect((err)=>{if(err) throw err })},
    getValue : ()=>{ return value;},
    setValue : (connection)=>{ value = connection;}
}