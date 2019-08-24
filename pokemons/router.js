const express = require("express");
const router = express.Router()
const pokemon = require('./pokemon')

// class Pokemon {
//   constructor(name,type){
//     this.name=name
//     this.type = type
//     this.type2 = null
//     this.id= null
//   }
// }
// let pokemons = [];
// pokemons.push(createnewPokemon('Vivillon','Bug'))
// pokemons.push(createnewPokemon('Diggersby','Normal'))

// function createnewPokemon(name,type){
//     let p = new Pokemon (name,type)
//     p.id = genNewId(pokemons.length)
//     return p
// }
function isInsufficientparameter(v){
    return v !== null && v !=='' && v !== undefined
}
// function isPokemonExsited(id){
//     return pokemons[id-1] !== null && pokemons[id-1] !== undefined
//   }
  
  // function genNewId(num){
  //     let newId = num +1
  //     return newId
  // }

//---------------------------------------------------------------------------------------------------

// Get ->   /pokemons -> list all pokemon
router.get("/pokemons", (req, res) => res.send(pokemon.getPokemon()));

// Post -> /pokemons -> add pokemon to list
router.post("/pokemons", (req, res) => {
    if(!isInsufficientparameter(req.body.name) 
    || !isInsufficientparameter(req.body.type)){

      res.status(400).send({error:'Insufficient parameters: name and type are required parameter'})
      return
    }
    // let p = pokemon.createnewPokemon(req.body.name,req.body.type)

    let success = pokemon.savePokemon(req.body.name,req.body.type)
    if (!success){
      res.status(400).send({error: 'Create pokemon is unsuccessfully: invilid parameter'})
      return
    } 
    // pokemons.save(p)
    // pokemons.push(p)
    res.sendStatus(201)
});
router.get("/pokemons/:id", (req, res) =>{
    let id = req.params.id
    if(!isInsufficientparameter(req.params.id)){
      res.status(400).send({error:'Insufficient parameters: ID is required parameter'})
      return 
    }
    let p = pokemon.getPokemonID(id)
    if(p === undefined){
      res.status(400).send({error:'Cannot defined pokemon! Pokemon is not found'})
      return
    }
    res.send(p)
  });
  
  
  router.put("/pokemons/:id", (req,res)=>{
  
    if(!isInsufficientparameter(req.body.type2)){
      res.status(400).send({error:'Insufficient parameters: type2 is required parameter'})
      return 
    }
      
    if(!isInsufficientparameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameters: ID is required parameter'})
        return 
    }
      let id = req.params.id
      let p = pokemon.getPokemonID(id)
      p.type2 = req.body.type2
      let success = pokemon.update(p)
      if (!success){
        res.status(500).send({error: 'Update pokemon is unsuccessfully'})
        return
      } 
    if(p === undefined){
        res.status(400).send({error:'Cannot update pokemon! Pokemon is not found'})
        return
    }
      
      res.sendStatus(200)
    
  })
  
  router.delete("/pokemons/:id", (req,res) =>{
    if(!isInsufficientparameter(req.params.id)){
      res.status(400).send({error:'Insufficient parameters: ID is required parameter'})
        return
    }
    let id = req.params.id
    let p = pokemons[id-1]
    if(!pokemon.isPokemonExsited(id)){
      res.status(400).send({error:'Cannot delete pokemon! Pokemon is not found'})
      return
    }
    delete pokemons[id-1]
    res.sendStatus(204)
  })
  module.exports = router
