const assert = require("assert")

const domain = require("../../lib/domain/DomainManage")


describe('DomainManage',()=>{
    describe(`#exec 的內部功能`,()=>{

        it(`open mysql & mongoDb database module in server`,()=>{
            domain.databaseMethod()
        })

        it(`open socket module in server`,()=>{
            domain.socketMethod()
        })

        it(`build http and https server`,()=>{
            domain.listen()
        })

        it(`http method 'get' url component`,()=>{
            domain.getMethod(["ob","oc"],1)
            domain.getMethod(["dd","bb"],2)
        })
    })
})