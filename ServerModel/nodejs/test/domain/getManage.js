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

    before(()=>{ 
        app = express()
        server = http.createServer(app)
        // server.listen(8501)
        chai.use(chaiHttp)
    })
    
    describe(`#domain`,()=>{
        it(`["test"] == []`,(done)=>{
            expect(gm.domain(["test"],app).toString())
            .to 
            .equal("")
            done()
        })
        it(`["/ppa/test/user"] == []`,(done)=>{
            expect(gm.domain(["/ppa/test/user"],app).toString())
            .to 
            .equal("")
            done()
        })
        it(`["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/user"] == ["/ObjectModel/test/user"]`,(done)=>{
            expect(gm.domain(["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/user"],app).toString())
            .to
            .equal("/ObjectModel/test/user")
            done()
        })
        it.skip(`["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"] == ["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"]`,(done)=>{
            expect(gm.domain(["/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action"],app).toString())
            .to.equal("/Users/chuyuwei/Documents/programming/project/myChicks/backend/backend/ObjectModel/test/action")
            done()
        })
    })
    describe(`#Atdomain`,()=>{
        
    })
    describe(`#defaultPage`,()=>{
        it(`/*/ = 200 && res.body == undefined`,(done)=>{
            gm.defaultPage(app)
            chai.request(server)
            .get("/*")
            .end(function(err,res,body){
                expect(200).to.equal(res.status)
                expect().to.equal(res.body.size)
                done()
            })
        })
    })
})