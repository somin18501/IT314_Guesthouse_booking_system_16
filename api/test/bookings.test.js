const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);


describe("Booking",()=>{
    

    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlkIjoiNjQ0Njc2MThmZDdmYTMyN2YzODM4YTViIiwiaWF0IjoxNjgyNTkwNTYzfQ.EgvewP3CyhmQPFVJEQhfJp_E6azES7mFQauJMXHMa8I";
    describe("POST /bookings", () => {
        it("User should book a place", (done) => {
            // You should replace the values below with valid test data
            const testData = {
                place: "64493ef7bf51360bfaf1a552",
                checkIn: "2023-04-21",
                checkOut: "2023-04-22",
                numOfGuests: 2,
                name: "John he",
                phone: "555121234",
                price: 100
            };
          

            chai
                .request(app)
                .post("/bookings")
                .set('Cookie', `token=${token}`)
                .send(testData)
                .end((err, res) => {
                   
                    res.statusCode.should.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('place').eql(testData.place);
                
                    res.body.should.have.property('numOfGuests').eql(testData.numOfGuests);
                    res.body.should.have.property('name').eql(testData.name);
                    res.body.should.have.property('phone').eql(testData.phone);
                    res.body.should.have.property('price').eql(testData.price);
                    done();
                });
        });
    });

    describe("GET /bookings", () => {
        it("User should view bookings", (done) => {
        
    
            chai
                .request(app)
                .get("/bookings")
                .set('Cookie', `token=${token}`)
                .end((err, res) => {
                    res.statusCode.should.equal(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.greaterThan(0);
                    res.body[0].should.have.property('place');
                  
                    res.body[0].should.have.property('checkIn');
                    res.body[0].should.have.property('checkOut');
                    res.body[0].should.have.property('numOfGuests');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('phone');
                    res.body[0].should.have.property('price');
                    done();
                });
        });
    });

    const bookingId = "6448b0f51c3c568da1ce458b";
    describe("GET /bookings/:id", () => {
        it("User should view bookings id-wise", (done) => {
            // You should replace the value below with a valid booking ID for testing
            
    
            chai
                .request(app)
                .get(`/bookings/${bookingId}`)
                .end((err, res) => {
                    res.statusCode.should.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('place');
                    res.body.should.have.property('checkIn');
                    res.body.should.have.property('checkOut');
                    res.body.should.have.property('numOfGuests');
                    res.body.should.have.property('name');
                    res.body.should.have.property('phone');
                    res.body.should.have.property('price');
                    done();
                });
        });
    });
   
});