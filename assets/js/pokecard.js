const link = window.location.href;
const value = window.location.search;
const split = value.substring(value.indexOf("="));
const id = split.slice(1);

const pokecard = document.getElementById("container");

const getGender = (id) => {
    const gender_url = `https://pokeapi.co/api/v2/gender/${id}/`;
    return fetch(gender_url)
        .then((response) => response.json())
        .then((result) => {return result.name})
        .catch((error)=>
        {
            const erro = "...";
            return erro;
        })
}
const getSpecie = (id)=>{
    const specie_url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(specie_url)
    .then((response) => response.json())
    .then((result) => {return result.genera[7].genus})
    .catch((error)=>
    {
        const erro = "...";
        return erro;
    })

}
const getEggGroup = (id)=>{
    const eggGroup_url = `https://pokeapi.co/api/v2/egg-group/${id}`;
    return fetch(eggGroup_url)
    .then((response) => response.json())
    .then((result) => {return result.name})
    .catch((error)=>
    {
        const erro = "...";
        return erro;
    })

}

async function fetchGender(id) {
    try {
        const gender = await getGender(id);
        return gender;
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}
async function fetchSpecie(id) {
    try {
        const specie = await getSpecie(id);
        return specie;
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}
async function fetchEggGroup(id) {
    try {
        const egg_group = await getEggGroup(id);
        return egg_group;
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}

function pokeCard(pokemon,gender,specie,egg_group) {
    return `
    <div class="pokemon_content ${pokemon.type}">
        <div class="pokemon_header">
            <div class="icons">
                <a href="index.html"><button class="icon-arrow" id="back_arrow"><i
                            class="fa-solid fa-arrow-left fa-2xl " style="color: #ffffff;"></i></button></a>
                <button class="icon-heart"><i class="fa-regular fa-heart fa-2xl red" id="icon-heart"></i></button>
            </div>
        </div>
        <div id="info">
    <div class="info-header">
            <span class="pokemon_name">${pokemon.name}</span>
            <span class="number">${pokemon.id_number< 10 ? '#00' + pokemon.id_number : "#0" + pokemon.id_number}</span>


        </div>
        <ol class="type-list">
        ${pokemon.types.map((type) => `<li class="pokemon_type ${type}">${type}</li>`).join("")}
        </ol>
        <div class="pokemon_image">
            <img src=${pokemon.img} alt="${pokemon.name}">
        </div>

        <div class="about_pokemon">

            <span class="title">About</span>
            <div class="line"></div>
            <div class="info">
                <div class="labels">
                    <span class="label">Species</span>
                    <span class="label">Height</span>
                    <span class="label">Weight</span>
                    <span class="label">Abilities</span>
                </div>
                <div class="inputs">
                    <span class="input ${pokemon.type}Color">${specie}</span>
                    <span class="input">${pokemon.height} M</span>
                    <span class="input">${pokemon.weight} KG</span>
                    <div class="abilities ${pokemon.type}Color">${pokemon.abilities.map((ability) => `<span class="input ability">${ability}</span>`).join("")}</div>
                </div>

            </div>

            <span class="title">Breeding</span>
            <div class="line"></div>
            <div class="breeding_info">
                <div class="labels">
                    <span class="label">Gender</span>
                    <span class="label">Egg Groups</span>
                    <span class="label">Egg Cycle</span>
                </div>
                <div class="inputs">
                    ${gender === 'female'? `<span class="input female">${gender}</span>`: `<span class="input male">${gender}</span>`}
                    <span class="input">${egg_group}</span>
                    <span class="input ${pokemon.type}Color">${pokemon.type}</span>
                </div>


            </div>
    `
}

function loadCard(id) {
    pokeAPI.GetPokecard(id).then(async (pokemon) => {
        const gender = await fetchGender(id);
        const specie = await fetchSpecie(id);
        const egg_group = await fetchEggGroup(id);
        const returnHtml = pokeCard(pokemon,gender,specie,egg_group);
        pokecard.innerHTML += returnHtml;
    })
}

loadCard(id);




