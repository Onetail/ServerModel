const assert = require("assert")

const domain = require("../../lib/domain/DomainManage")


describe('DomainManage',()=>{
    describe(`#exec 的內部功能`,()=>{

        it(`open mysql & mongoDb database module in server`,(done)=>{
            domain.databaseMethod()
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