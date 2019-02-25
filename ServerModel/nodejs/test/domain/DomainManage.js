const domain = require("../../lib/domain/DomainManage")
const chai = require("chai")
var expect = chai.expect
const path = require("path")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

const chaiHttp = require("chai-http")

const mysqlDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongoDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))

describe('DomainManage',()=>{
    describe(`#exec 的內部功能`,()=>{
        describe(`> database`,()=>{
            before(()=>{
                domain.databaseMethod()
            })
    
            after(()=>{
                mongoDB.getValue().close()
                mysqlDB.getValue().end()
            })
            // finished
            it(`mongoDb database module in server`,(done)=>{  

                var mongo = mongoDB.getValue()
                expect(mongo).to.exist
                done()
            })
            it(`mysqlDb database module in server`,(done)=>{
                var mysql = mysqlDB.getValue()
                expect(mysql).to.exist
                done()
            })
        })
        describe(``,()=>{
            it(`open socket module in server`,(done)=>{
                domain.socketMethod()
                done()
            })
        })

        describe(`Server Listen`,()=>{
            
            before(()=>{
                domain.listen()
                chai.use(chaiHttp)
            })
            after(()=>{

            })
            it(`build http server`,(done)=>{
                
                chai.request("http://localhost:8501")
                .get("/")
                .end((err,res,body)=>{
                    expect(res).to.not.undefined
                    expect(res).to.have.status(404)
                    done()
                })
            })
            it.skip(`build https server`,(done)=>{
                chai.request("https://localhost:443/")
                .get("/")
                .end((err,res)=>{
                    console.log(res)
                    expect(res).to.have.status(404)
                    done()
                })

            })

            it(`http method 'get' url component`,(done)=>{
                domain.getMethod(["ob","oc"],1)
                domain.getMethod(["dd","bb"],2)
                done()
            })
        })
    })
})