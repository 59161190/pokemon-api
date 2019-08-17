const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
class Pokemon {
  constructor(name,type){
    this.name=name
    this.type = type
    this.id=null
  }
}
var pokemons = [
  // { name: "Vivillon", type: "Bug" },
  // { name: "Diggersby", type: "Normal" },
  // { name: "Raichu", type: "Electric" }
];
pokemons.push(createnewPokemon('Vivillon','Bug'))

app.get("/", (req, res) => res.send("Hello World!! eeeeee"));
// Get ->   /pokemons -> list all pokemon
app.get("/pokemons", (req, res) => res.send(pokemons));

// Post -> /pokemons -> add pokemon to list
app.post("/pokemons", (req, res) => {
  //req ย่อมาจาก request , res ย่อมาจาก respone การตอบกลับ
//   console.log(req.body);
//   res.send("Still work in progress...");
    pokemons.push(createnewPokemon(req.body.name,req.body.type))
    res.sendStatus(201)
});

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