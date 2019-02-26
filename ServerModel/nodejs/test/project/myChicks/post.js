const chai = require("chai")
const chaiHttp = require("chai-http")
const path = require("path")

var expect = chai.expect

const project = require("../../../lib/project/myChicks/post")
const global = require(path.join(__dirname,"../../../../../Assets/global/Global"))

const express = require("express")
const http = require("http")

// test module
const mongodb = require(path.join(__dirname,"../"+global.Server.SERVERABSOLUTEPOSITION+"/Assets/database/mongoDB"))


describe(`myChicks Test`,()=>{
    var app , 
        server,
        mongo,
        Collection_Name = "User_Detail",
        Database_Name = "myChicks",
        isPlacard = true

    before(()=>{ 
        app = express()
        server = http.createServer(app)
        chai.use(chaiHttp)

        mongo = mongodb.exec(mongo)
        mongo = mongo.getValue()
        project.exec({app:app,mongodb:mongodb})
    })

    describe(`#Post Method`,()=>{
        it(`POST ${global.Server.SERVERLOCALE}/UserRegister`,(done)=>{
            console.log(mongo.db(Database_Name).collection(Collection_Name).find({}))
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/UserCheckIsExist`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/UserLogin`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/PetIsExist`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/PetNewInsert`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/UserDetail`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/PetSetAttributes`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/UserBuySelling`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/PetPrice`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/PetSelling`,(done)=>{
            done()
        })
        it.skip(`POST ${global.Server.SERVERLOCALE}/GamePlacard`,(done)=>{
            done()
        })
    })
})