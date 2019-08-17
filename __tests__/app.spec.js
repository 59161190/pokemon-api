const request = require('supertest')
const chai = require('chai')
const app =require('../app')
chai.should()
describe('Pokemon API' ,()=>{
    describe('GET /' , () => {
        it('should return 200 OK with "Hello World"', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err,res)=>{
                    res.body.should.deep.equal({message:"Hello World!!"}) // จริงๆแล้วres ไม่มี .shoul.deep แต่เป็นเพราะ chai เลยใช้ได้ || deep เท่ากับ ===
                    done() // invoke function done()
                })
        })
    })

    describe('GET /pokemons/:id',()=>{
        it('should return Data Vivillon when id = 1',(done) => {
            request(app)
                
                .get('/pokemons/1')
                .expect(200)
                .end((err,res)=>{
                    res.body.should.have.property('name')
                    res.body.should.have.property('type')
                    res.body.should.have.property('id')
                    res.body.should.deep.equal({ 
                        name: "Vivillon", 
                        type: "Bug" ,
                        type2: null ,
                        id: 1
                    })
                    done()
                })
        })
        it('should return 400 bad request', (done)=>{
            request(app).get('/pokemons/99')
                .expect(400)
                .end((err,res)=>{
                    res.body.error.should.equal('Cannot defined pokemon! Pokemon is not found') 
                    done()
                })
                
        })
    
       
    }) 
    describe('POST /pokemons',() =>{
        it('should return 201 create and have new pokemon' , (done)=>{
            request(app)
                .post('/pokemons')
                .send({name: 'Raichu',type:'Electric'})
                .set('Accept','application/json')
                .expect(201,done)
        })
        it('should return 400 Bad requeset when missed requied field' , (done)=>{
            request(app)
                .post('/pokemons')
                .expect(400)
                .end((err,res)=>{
                    res.body.error.should.equal('Insufficient parameters: name and type are required parameter')
                    done()
                })

        })
    })
    describe('PUT /pokemons/:id',() =>{
        it('should return 200 OK and the pokemon has type2' , (done)=>{
            request(app)
                .put('/pokemons/1')
                .send({type2:'poison'})
                .set('Accept','application/json')
                .expect(200,done)

        })
        it('should return 400 Bad requeset when try to update not existed pokemon' , (done)=>{
            request(app)
                .put('/pokemons/2')
                .expect(200)
                .end((err,res)=>{
                    res.body.error.should.equal('Insufficient parameters: type2 is required parameter')
                    done()
                })

        })
    })
})
// describe('Integration Test',()=>{
//     it('GET /pokemons should return list of pokemon' , (done)=>{
//         // nock('http://localhost:3000').get('/pokemons')
//         //     reply(200,[
//         //             {id:1,name:"Vivillon",type:"Bug"}
//         //     ])
//         request('http://localhost:3000').get('/pokemons')
//         .expect(200)
//         .end((err,res)=>{
//             res.body.should.be.a('array')
//             done()
//         })

//     })
// })