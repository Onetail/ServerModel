const chai = require("chai")
const chaiHttp = require("chai-http")
const path = require("path")

var expect = chai.expect

const gm = require("../../lib/domain/getManage")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

const express = require("express")
const http = require("http")

describe(`getManage`,()=>{

    var app , 
        server ;

    beforeEach(()=>{ 
        app = express()
        server = http.createServer(app)
        // server.listen(8501)
    })
    before(()=>{
        chai.use(chaiHttp)
    })
    
    after(()=>{
        server.close()    
    })

    describe(`#domain`,()=>{
        it(`["test"] == []`,()=>{
            expect(gm.domain(["test"],app).toString())
            .to 
            .equal("")
        })
        it(`["/ppa/test/user"] == []`,()=>{
            expect(gm.domain(["/ppa/test/user"],app).toString())
            .to 
            .equal("")
        })
        it(`["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/user"] == ["/ObjectModel/test/user"]`,()=>{
            expect(gm.domain(["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/user"],app).toString())
            .to
            .equal("/ObjectModel/test/user")
        })
        it.skip(`["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"] == ["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"]`,()=>{
            expect(gm.domain(["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"],app).toString())
            .to.equal("/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action")
            throw new Error(global.POSTFILEENDWITH)
            
        })
    })
    describe(`#Atdomain`,()=>{
        
    })
    describe(`#defaultPage`,()=>{

    })
})