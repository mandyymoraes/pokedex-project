const link = window.location.href;
const value = window.location.search;
const split = value.substring(value.indexOf("="));
const id = split.slice(1);

const pokecard = document.getElementById("container");

function pokeCard(pokemon) {
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
                    <span class="input">${pokemon.specie}</span>
                    <span class="input">${pokemon.height}</span>
                    <span class="input">${pokemon.weight}</span>
                    ${pokemon.abilities.map((ability) => `<span class="input">${ability}</span>`).join("")}
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
                    <span class="input">1334649988687</span>
                    <span class="input">${pokemon.egg_group}</span>
                    <span class="input">13464</span>
                </div>


            </div>
    `
}

function loadCard(id) {
    pokeAPI.GetPokecard(id).then((pokemon) => {
        const returnHtml = pokeCard(pokemon);
        pokecard.innerHTML += returnHtml;
    })
}

loadCard(id);




