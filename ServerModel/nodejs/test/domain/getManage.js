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
        describe(`\tApi `, ()=>{
            it(`GET ${global.Server.SERVERLOCALE}${global.Server.SERVERADDRESS}/`,(done)=>{
                gm.Atdomain(app)
                chai.request(server)
                .get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/")
                .end((err,res,body)=>{
                    expect(200).to.equal(res.status)
                    done()
                })
            })
            it(`GET 金鑰 `,(done)=>{
                gm.Atdomain(app)
                chai.request(server)
                .get("/.well-known/acme-challenge/2PstEktjN5T8R_JQwcOY_RrJ9Ki_asJhTpih7S-s04Y")
                .end((err,res,body)=>{
                    expect(200).to.equal(res.status)
                    expect("2PstEktjN5T8R_JQwcOY_RrJ9Ki_asJhTpih7S-s04Y.AAdaTX30-mFwJx084cG_TUgiJsT_zXWpSX8QVPfBrVA").to.equal(res.text)
                    done()
                })
            })
        })
    })
    describe(`#defaultPage`,()=>{
        it(`/*/ = 404 && res.body == undefined`,(done)=>{
            gm.defaultPage(app)
            chai.request(server)
            .get("/*")
            .end(function(err,res,body){
                expect(404).to.equal(res.status)
                expect().to.equal(res.body.size)
                done()
            })
        })
    })
})