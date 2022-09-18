const names = [
    { name: 'bulbasaur', number: '1', type1: 'Grass', weakness: 'Fire' },
    { name: 'ivysaur', number: '2', type1: 'Grass', weakness: 'Fire' },
    { name: 'venusaur', number: '3', type1: 'Grass', weakness: 'Fire' },
    { name: 'charmander', number: '4', type1: 'Fire', weakness: 'Water' },
    { name: 'charmeleon', number: '5', type1: 'Fire', weakness: 'Water' },
    { name: 'charizard', number: '6', type1: 'Fire', weakness: 'Water' },
    { name: 'squirtle', number: '7', type1: 'Water', weakness: 'Grass' },
    { name: 'wartortle', number: '8', type1: 'Water', weakness: 'Grass' },
    { name: 'blastoise', number: '9', type1: 'Water', weakness: 'Grass' },
    { name: 'caterpie', number: '10', type1: 'Bug', weakness: 'Fire' },
    { name: 'metapod', number: '11', type1: 'Bug', weakness: 'Fire' },
    { name: 'butterfree', number: '12', type1: 'Bug', weakness: 'Fire' },
    { name: 'weedle', number: '13', type1: 'Bug', weakness: 'Fire' },
    { name: 'kakuna', number: '14', type1: 'Bug', weakness: 'Fire' },
    { name: 'beedrill', number: '15', type1: 'Bug', weakness: 'Fire' },
    { name: 'pidgey', number: '16', type1: 'Normal', weakness: 'Electric' },
    { name: 'pidgeotto', number: '17', type1: 'Normal', weakness: 'Electric' },
    { name: 'pidgeot', number: '18', type1: 'Normal', weakness: 'Electric' },
    { name: 'rattata', number: '19', type1: 'Normal', weakness: 'Fighting' },
    { name: 'raticate', number: '20', type1: 'Normal', weakness: 'Fighting' }
];

// Restricts input for the given searchBox to the given inputFilter.
function setInputFilter(searchBox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        searchBox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}


setInputFilter(document.getElementById("pokemon-num-search-box"), function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 20) && (value === "" || parseInt(value) >= 1);
}, "Please Enter A Number between 1 and 20");


setInputFilter(document.getElementById("pokemon-name-search-box"), function (value) {
    return /^[a-z]*$/i.test(value);
}, "Please Enter A Character from A-Z ");

//Pop-Up
const popup = document.querySelector("#popup");
const openPopUP = document.querySelector(".open-button");
const closePopUp = document.querySelector(".close-button");

openPopUP.addEventListener("click", () => {
    popup.showModal();
});

closePopUp.addEventListener("click", () => {
    popup.close();
});


//load pokemons by names
const list = document.getElementById('list');

function setList(PkNames) {
    clearList();
    for (const pokemon of PkNames) {
        const item = document.createElement('li');
        item.classList.add('search-list-item')
        const nameOfPokemon = document.createTextNode("Name: " + pokemon.name);
        const idOfPokemon = document.createTextNode("Number: " + pokemon.number);
        const typeOfPokemon = document.createTextNode("Type 1: " + pokemon.type1);
        const weaknessOfPokemon = document.createTextNode(" Weakness: " + pokemon.weakness);
        item.appendChild(idOfPokemon);
        item.appendChild(nameOfPokemon);
        item.appendChild(typeOfPokemon);
        item.appendChild(weaknessOfPokemon);
        list.appendChild(item);
    }

    if (PkNames.length === 0) {
        console.log('no result')
        setNoResult();
    }

    for (const pokemon of PkNums) {
        const item = document.createElement('li');
        item.classList.add('num-search-list-item')
        const nameOfPokemon = document.createTextNode("Name: " + pokemon.name);
        const idOfPokemon = document.createTextNode("Number: " + pokemon.number);
        const typeOfPokemon = document.createTextNode("Type 1: " + pokemon.type1);
        const weaknessOfPokemon = document.createTextNode(" Weakness: " + pokemon.weakness);
        item.appendChild(idOfPokemon);
        item.appendChild(nameOfPokemon);
        item.appendChild(typeOfPokemon);
        item.appendChild(weaknessOfPokemon);
        list.appendChild(item);
    }
}


function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function setNoResult() {
    const item = document.createElement('li');
    item.classList.add('search-list-item')
    const text = document.createTextNode("No Results Found");
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        return 0;
    } else {
        return -1;
    }
}

const searchInput = document.getElementById('pokemon-name-search-box');

searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(names.filter(pokemon => {
            return pokemon.name.includes(value);
        }).sort((pokemonA, pokemonB) => {
            return getRelevancy(pokemonB.name, value) - getRelevancy(pokemonA.name, value);
        }));
    } else {
        clearList();
    }
});

//load pokemons by number
const searchInput2 = document.getElementById('pokemon-num-search-box');

searchInput2.addEventListener('input', (e) => {
    let value = e.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(names.filter(pokemon => {
            return pokemon.number.includes(value);
        }));
    } else {
        clearList();
    }
});
