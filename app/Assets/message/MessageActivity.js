const error = require("./errorMessage")
const success = require("./successMessage")
const message = require("./msgMessage")

module.exports = {
    success:(val,msg)=>{success.exec(val,msg)},
    error:(val,msg)=>{error.exec(val,msg)},
    message:(val,msg)=>{message.exec(val,msg)}
}