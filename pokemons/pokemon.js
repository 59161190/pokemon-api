class Pokemon {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.type2 = null;
    this.id = null;
  }
}
let pokemons = [];
mockPokemon()
function mockPokemon() {
  pokemons.push(createnewPokemon("Vivillon", "Bug"));
  pokemons.push(createnewPokemon("Diggersby", "Normal"));
}
function savePokemon(name,type){
    let p = createnewPokemon(name,type)
    pokemons.push(p)
    return true
}
function createnewPokemon(name, type) {
  let p = new Pokemon(name, type);
  p.id = genNewId(pokemons.length);
  return p;
}
function genNewId(num) {
  let newId = num + 1;
  return newId;
}
function isPokemonExsited(id) {
  return pokemons[id - 1] !== null && pokemons[id - 1] !== undefined;
}
function getPokemon(){
    return pokemons
}
function getPokemonID(id){
    return pokemons[id-1]
}
function update(pokemon){
    pokemons[pokemon.id-1] = pokemon
    return true
}
module.exports.update = update
module.exports.getPokemonID = getPokemonID
module.exports.getPokemon = getPokemon
module.exports.isPokemonExsited = isPokemonExsited
module.exports.savePokemon = savePokemon
