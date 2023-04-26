const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("User",()=>{
    //login module
    describe("POST /login",()=>{
        it("it should login user",(done)=>{
            chai
            .request(app)
            .post("/login")
            .send({
                email:"hello@gmail.com",
                password:"1234"
            })
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //register module
    describe("POST /register",()=>{
        it("it should register user",(done)=>{
            chai
            .request(app)
            .post("/register")
            .send({
                username:"harsh",
                email:"op@gmail.com",
                password:"1234",
            })
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })
})
