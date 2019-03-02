
module.exports = {
    exec : (app,address) =>{
        module.exports.check(app,address)
    },
    check:(app,address)=>{
        app.use(address,(req,res,next)=>{
            // project  middle ware 
            
            next()
        })
    }
}