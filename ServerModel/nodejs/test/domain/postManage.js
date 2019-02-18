const chai = require("chai")
const chaiHttp = require("chai-http")
const path = require("path")

var expect = chai.expect

const pm = require("../../lib/domain/postManage")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

const express = require("express")
const http = require("http")

// Test postManage and create test server
describe("PostManager",()=>{
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
    });
    
    describe("post Domain",()=>{
        it(`domain(["test"],app)[0] == "/test" `,()=>{
            
            expect(pm.domain(["test"],app)[0]).to.equal("/test")
            chai.request(server)
            .post("/test")
            .end(function(err,res,body){
                expect(200).to.equal(res.status)
            })
            
        })
        it(`domain(["/test"],app)[0] == "/test"`,()=>{
            expect(pm.domain(["/test",""],app)[0]).to.equal("/test")
        })
        it(`domain(["dir/test"],app)[0] == "/test"`,()=>{
            expect(pm.domain(["dir/test"],app)[0]).to.equal("/test")
        })
        it(`domain(["/dir/test"],app)[0] == "/test"`,()=>{
            expect(pm.domain(["/dir/test"],app)[0]).to.equal("/test")
        })
        it(`domain(["${global.Server.SERVERLOCALE}/dir/test"],app)[0] == "${global.Server.SERVERLOCALE}/dir/test"`,()=>{
            expect(
                pm.domain([`${global.Server.SERVERLOCALE}/dir/test`],app)[0]
            ).to.equal(`${global.Server.SERVERLOCALE}/dir/test`)
        })        
        it(`domain(["/a${global.Server.SERVERLOCALE}/dir/test"],app)[0] == "${global.Server.SERVERLOCALE}/dir/test"`,()=>{
            expect(
                pm.domain([`/a${global.Server.SERVERLOCALE}/dir/test`],app)[0]
            ).to.equal(`${global.Server.SERVERLOCALE}/dir/test`)
        })
        it(`domain(["dir/test","/a${global.Server.SERVERLOCALE}/dir/test"],app) == "/test,${global.Server.SERVERLOCALE}/dir/test"`,()=>{
            var string = "",
                array = ["dir/test",`/a${global.Server.SERVERLOCALE}/dir/test`]
                
            expect(
                pm.domain(array,app).toString()
            ).to.equal(`/test,${global.Server.SERVERLOCALE}/dir/test`)
        })
    })

    describe("AtDomain",()=>{
        it(`Post Package test`,()=>{
            pm.Atdomain(app)
            chai.request(server)
            .post(global.Server.SERVERLOCALE+"/Package")
            .end(function(err,res,body){
                expect(200).to.equal(res.status)
            })
        })

        it(`Add your project`,()=>{
            console.log("\x1b[33m","\t\tin postManage")
            console.log("\x1b[0m","")
        })
    })
})