//https://bit.ly/2KQb0gR
const express = require("express");
const Request = require("request")

const pokemonsRouter =require("./pokemons/router") //ระบุตำแหน่ง router

const app = express()
app.use(express.json());

app.use('/',pokemonsRouter) // ทำความรู้จัก router
//root
app.get("/", (req, res) => res.send({message:"Hello World!!"}));

module.exports = app
