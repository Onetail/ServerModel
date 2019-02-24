const domain = require("../../lib/domain/DomainManage")
const chai = require("chai")
var expect = chai.expect
const path = require("path")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

const mysqlDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mysqlDB"))
const mongoDB = require(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))

describe('DomainManage',()=>{
    describe(`#exec 的內部功能`,()=>{

        before(()=>{
            domain.databaseMethod()
        })

        after(()=>{
            mongoDB.getValue().close()
        })

        it(`open mysql & mongoDb database module in server`,(done)=>{  
            
            var mongo = mongoDB.getValue()
            expect(mongo).to.exist
            done()
        })

        it(`open socket module in server`,(done)=>{
            domain.socketMethod()
            done()
        })

        it(`build http and https server`,(done)=>{
            domain.listen()
            done()
        })

        it(`http method 'get' url component`,(done)=>{
            domain.getMethod(["ob","oc"],1)
            domain.getMethod(["dd","bb"],2)
            done()
        })
    })
})