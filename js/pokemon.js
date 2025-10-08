var esFavorito = false;
//funcion para agregar o quitar de un pokemon de favoritos
function toggleFavorito(paramid, paramname) {
alert (paramid+ "" + paramname)
  // Leer favoritos actuales desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false

    // Verificar si ya está guardado
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].name === paramname) {
            existe = true;
            break;
        }
    }
       if (existe == true) {
        favoritos = favoritos.filter(poke => poke.name !== paramname);
        esFavorito = false;
    } else {
        // Si no está, agregarlo
        favoritos.push({
            name: paramname,
            url: `https://pokeapi.co/api/v2/pokemon/${paramid}/`
        });
        esFavorito = true;
    }
    //guardar el array actualizado en el localstorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    //actualizar el icono en pantalla (si existe el boton)
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";

}
async function Detalle(h){
        
        const root = document.getElementById("root");
        root.innerHTML ="";

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${h}`);
        const data = await res.json();
        
        // Revisar si este Pokémon ya está en favoritos
        favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        esFavorito = favoritos.some(poke => poke.name === data.name);

        // Tipos
        let tipoPoke = "";
        for (let i = 0; i < data.types.length; i++) {
            tipoPoke += `<span>${data.types[i].type.name}</span> `;
        }

        document.getElementById("root").innerHTML= `
    <section class="c-detalle">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>${tipoPoke}</p>
        <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} kg</p>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>Velocidad: ${data.stats[5].base_stat}</p>
        <p>Ataque: ${data.stats[1].base_stat} Defensa: ${data.stats[2].base_stat}</p>
        <p>Ataque Especial: ${data.stats[3].base_stat} Defensa Especial: ${data.stats[4].base_stat}</p>

    </section>
    `;
    
}