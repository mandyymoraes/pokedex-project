const pokeAPI = {};

function convertDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    const types = pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types;
    pokemon.name = pokemonDetail.name;
    pokemon.id_number = pokemonDetail.id;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.img = pokemonDetail.sprites.other.dream_world.front_default;
    const abilities = pokemonDetail.abilities.map((abilitySlot)=> abilitySlot.ability.name);
    const [ability] = abilities;
    pokemon.height = pokemonDetail.height;
    pokemon.weight = pokemonDetail.weight;
    pokemon.abilities = abilities;
    pokemon.ability = ability;
    pokemon.specie = pokemonDetail.species;
    pokemon.egg_group = pokeAPI.getEggGroup(pokemonDetail.id);
    

    return pokemon;
}

pokeAPI.pokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertDetailToPokemon);

}
pokeAPI.getPokemons = (offset=0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.pokemonDetail))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => pokemonDetails)
        
}

pokeAPI.GetPokecard = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((responseCard) => responseCard.json())
        .then((jsonBody) => convertDetailToPokemon(jsonBody)) 
        .then((detail)=> Promise.resolve(detail))
   
}
pokeAPI.getEggGroup = (id) => {
    const eggGroupsUrl=`https://pokeapi.co/api/v2/egg-group/${id}`;
    return fetch(eggGroupsUrl)
    .then ((res)=>res.json())
    .then((jsonBody)=>jsonBody)
    .then((objeto)=> {
        if (objeto.id == 1){
            const eggGroup = objeto.name;
            return eggGroup;
        }
    })
    
    
    
    
 
};
