//https://bit.ly/2KQb0gR
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
class Pokemon {
  constructor(name,type){
    this.name=name
    this.type = type
    this.type2 = null
    this.id= null
  }
}
var pokemons = [
  // { name: "Vivillon", type: "Bug" },
  // { name: "Diggersby", type: "Normal" },
  // { name: "Raichu", type: "Electric" }
];
pokemons.push(createnewPokemon('Vivillon','Bug'))
pokemons.push(createnewPokemon('Diggersby','Normal'))
app.get("/", (req, res) => res.send("Hello World!! eeeeee"));
// Get ->   /pokemons -> list all pokemon
app.get("/pokemons", (req, res) => res.send(pokemons));

// Post -> /pokemons -> add pokemon to list
app.post("/pokemons", (req, res) => {
  //req ย่อมาจาก request , res ย่อมาจาก respone การตอบกลับ
//   console.log(req.body);
//   res.send("Still work in progress...");
    if(isInsufficientparameter(req.body.name)|| isInsufficientparameter(req.body.type)){
      res.status(400).send({error:'Insufficient parameters: name and type are required parameter'})
      return
    }
    pokemons.push(createnewPokemon(req.body.name,req.body.type))
    res.sendStatus(201)
});
// http://localhost:3000/pokemon/1
app.get("/pokemons/:id", (req, res) =>{
  let id = req.params.id
  let p = pokemons[id-1]
  res.send(p)
});


app.put("/pokemons/:id", (req,res)=>{

  if(!isInsufficientparameter(req.body.type2)){
    res.status(400).send({error:'Insufficient parameters: type2 is required parameter'})
    return 
  }
    
  if(!isInsufficientparameter(req.params.id)){
      res.status(400).send({error:'Insufficient parameters: ID is required parameter'})
      return 
  }
    let id = req.params.id
    let p = pokemons[id-1]
  if(p === undefined){
      res.status(400).send({error:'Cannot update pokemon! Pokemon is not found'})
      return
  }

    p.type2 = req.body.type2
    pokemons[id-1] = p
    res.sendStatus(200)
  
})




function isInsufficientparameter(v){
  return v !== null || v !=='' || v !== undefined
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



function createnewPokemon(name,type){
  let p = new Pokemon (name,type)
  p.id = genNewId(pokemons.length)
  return p
}

function genNewId(num){
    let newId = num +1
    return newId
}