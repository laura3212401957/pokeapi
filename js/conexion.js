let pokemones = [];
let totalPokes = 10;

// Conexión para obtener la lista de Pokémon
async function conexion() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
  const data = await res.json();
  return data.results;
}

// Cargar todos los Pokémon al iniciar
async function General() {
  if (pokemones.length === 0) {
    pokemones = await conexion("all");
  }
  home();
  
}
async function FiltroConexion(Elfiltro) {
  document.getElementById("la-lista").innerHTML = "";
  pokemones = await conexionLista(Elfiltro);
  const listaHTML = generarLista(pokemones);
  document.getElementById("la-lista").innerHTML = listaFiltro
}