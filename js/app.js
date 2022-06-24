const myJson = file;

//Variables para filtrar la navegacion
let inicio = 0;
let final = 10;

//Objeto Pokemon
class Pokemon {
    constructor(id, name, image, type, height, weight, abilities) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    getType() {
        return this.type;
    }

    getHeight() {
        return this.height;
    }

    getWeight() {
        return this.weight;
    }

    getAbilities() {
        return this.abilities;
    }
}

//Mostrar en consola los datos
console.log(myJson);

//Botones y containeres
const cardContainer = document.querySelector(".cards-container")
const btnMore = document.querySelector(".showMore");
const modal = document.querySelector('.modal');
const btnSearch = document.querySelector(".btn-search");

//Arreglo para filtrar pokemons
let pokemonsFiltrados = [];

//Llenamos antes de que se cargue la pagina
document.addEventListener('DOMContentLoaded', e => {
    llenarCards(myJson);
})

//Boton de ver mas
btnMore.addEventListener('click', () => {
    inicio += 10;
    final += 10;
    llenarCards(myJson);
})

//Boton buscar
btnSearch.addEventListener('click', () => {
    pokemonsFiltrados = [];
    const search = document.querySelector(".input-search").value;
    //Si no hay nada muestro todo
    if(search === "") {
        inicio = 0;
        final = 10;
        //Borro lo que hay
        cardContainer.innerHTML = "";
        llenarCards(myJson);
    }
    else{
        //Busco con el foreach igualdades
        myJson.forEach(pokemon => {
            if (pokemon.name === search){
                pokemonsFiltrados.push(pokemon);
            }
        });
        //El inicio es 0 y el final es la longitud del arreglo
        inicio = 0;
        final = pokemonsFiltrados.length;
        //Borro lo que hay
        cardContainer.innerHTML = "";
        //Lleno las cards
        llenarCards(pokemonsFiltrados);
    }
})

//Logica de los botones del modal
const logicaBotones = data => {
    //Obtengo todos los botones info que hay
    const infoBtn = document.querySelectorAll('.info-button');
    let html = '';
    let doc;
    infoBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            //Uso el dataset para obtener la informacion del boton del pokemon
            doc = data[btn.dataset.id];
            //Lleno las habilidades aparte
            let htmlAbilities = "";
            doc.abilities.forEach(abilitie => {
                htmlAbilities += `
                <p>${abilitie}</p>
                `;
            })
            //Hago el template html
            html = `
            <div class="info-modal">
                <img src="${doc.ThumbnailImage}" alt="${doc.name}">
                <h2>${doc.name}</h2>
                <p>Height: ${doc.height} inch</p>
                <p>Weight: ${doc.weight} lb</p>
            </div>
            <div class="abilities">
                <div class="title-abilities">

                    <p>Abilities</p>
                </div>
                <div class="list-abilities">
                    ${htmlAbilities}
                </div>
            </div>
            <button class="exit-button">
                X
            </button>
            `;
            modal.innerHTML = html;
            //Cambio a visible el modal
            modal.classList.toggle("visible");

            //BtnExit
            const btnExit = document.querySelector(".exit-button");
            btnExit.addEventListener('click', () => {
                modal.classList.toggle("visible");
            })
        })
    })

}

const llenarCards = data => {
    let template = '';
    let doc;
    let pokemon;
    let templateTypes;
    for (let i = inicio; i < final; i++) {
        doc = data[i];
        pokemon = new Pokemon(doc.id, doc.name, doc.ThumbnailImage, doc.type, doc.height, doc.weight, doc.abilities);

        templateTypes = "";
        pokemon.getType().forEach(type => {
            templateTypes += `<div class="type">
            <p>${type.toUpperCase()}</p>
            </div>`
        })
        template += `
        <div class="card">
            <div class="img-card">
                <img src="${pokemon.getImage()}" alt="${pokemon.getName()}">
            </div>
            <div class="info-card">
                <h2>${pokemon.getName()}</h2>
                
                <div class="types">
                    <p>Type:</p>
                    <div class="types-container">
                        ${templateTypes}
                    </div> 
                </div>
            </div>
            <div class="button-modal">
                <button class="info-button" data-id="${i}">
                    i
                </button>
            </div>  
        </div>
        `
    }

    cardContainer.innerHTML += template;
    logicaBotones(data);
}