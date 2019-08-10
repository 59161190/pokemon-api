const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

var pokemons = [
  { name: "Vivillon", type: "Bug" },
  { name: "Diggersby", type: "Normal" },
  { name: "Raichu", type: "Electric" }
];

app.get("/", (req, res) => res.send("Hello World!!"));
// Get ->   /pokemons -> list all pokemon
app.get("/pokemons", (req, res) => res.send(pokemons));

// Post -> /pokemons -> add pokemon to list
app.post("/pokemons", (req, res) => {
  //req ย่อมาจาก request , res ย่อมาจาก respone การตอบกลับ
//   console.log(req.body);
//   res.send("Still work in progress...");
    pokemons.push(req.body)
    res.sendStatus(201)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
