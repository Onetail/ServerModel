const chai = require("chai")
var expect = chai.expect
const path = require("path")
const fp = require("../../lib/path/Filepath")
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

describe(`Filepath`,()=>{
    
    describe(`\t#exec`,()=>{
        it(` -> lib/path getLocate['lib/path/Filepath.js'] postLocate[]`,(done)=>{
            fp.exec("lib/path")
            expect(fp.getLocate().toString()).to.equal("lib/path/Filepath.js")
            expect(fp.postLocate().toString()).to.equal("")
            done()
        })
    })
    describe(`\t#isPostFile`,()=>{
        it(`post.js === false`,(done)=>{
            expect(
                fp.isPostFile("post.js")
            ).to
            .false
            done()
        })

        it(`${global.POSTFILEENDWITH} === true`,(done)=>{

            expect(
                fp.isPostFile(global.POSTFILEENDWITH[0])
            ).to.true
            done()
        })
    })
    describe(`\t#clsLocate`,()=>{
        it(``,(done)=>{
            fp.exec("../../")
            fp.clsLocate()
            expect(
                fp.getLocate().toString() + fp.postLocate().toString()
            ).to
            .equal("")
            done()
        })
    })
})