// function convertPokemonType(pokemonType){
//     return pokemonType.map((typeSlot)=>`<li class="type">${typeSlot.type.name}</li>`)

// }
const pokemon_list = document.getElementById('pokemon-list');
const pag_button = document.getElementById("next-page");
const limit = 3;
let offset = 0;
const maxPokemon = 1281;

function convertPokemon(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}" >
     <a href="pokecard.html?id=${pokemon.id_number}" id=${pokemon.id_number}>
        <div>
                    <span class="pokemon-number">${pokemon.id_number < 10 ? '#00' + pokemon.id_number : "#0" + pokemon.id_number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <img src=${pokemon.img}
                            alt=${pokemon.name}>

                    </div>
        </div>
                  
    </a>
                </li>
    `
}

function loadPokemon(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemon).join('');
        pokemon_list.innerHTML += newHtml

    })

}

loadPokemon(offset, limit);


pag_button.addEventListener('click', () => {
    offset += limit
    const pokemonPerPage = offset + limit

    if (pokemonPerPage >= maxPokemon) {
        const newLimit = maxPokemon - offset
        loadPokemon(offset, newLimit)

        pag_button.parentElement.removeChild(pag_button)
    } else {
        loadPokemon(offset, limit)
    }
})





