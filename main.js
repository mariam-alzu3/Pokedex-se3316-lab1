const names = [
    { name: 'bulbasaur', number: '001', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow' },
    { name: 'ivysaur', number: '002', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow' },
    { name: 'venusaur', number: '003', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow' },
    { name: 'charmander', number: '004', type1: 'Fire', weakness: 'Water', abilities: 'Blaze' },
    { name: 'charmeleon', number: '005', type1: 'Fire', weakness: 'Water', abilities: 'Blaze' },
    { name: 'charizard', number: '006', type1: 'Fire', weakness: 'Water', abilities: 'Blaze' },
    { name: 'squirtle', number: '007', type1: 'Water', weakness: 'Grass', abilities: 'Torrent' },
    { name: 'wartortle', number: '008', type1: 'Water', weakness: 'Grass', abilities: 'Torrent' },
    { name: 'blastoise', number: '009', type1: 'Water', weakness: 'Grass', abilities: 'Torrent' },
    { name: 'caterpie', number: '010', type1: 'Bug', weakness: 'Fire', abilities: 'Shield Dust' },
    { name: 'metapod', number: '011', type1: 'Bug', weakness: 'Fire', abilities: 'Shed Skin' },
    { name: 'butterfree', number: '012', type1: 'Bug', weakness: 'Fire', abilities: 'Compound Eyes' },
    { name: 'weedle', number: '013', type1: 'Bug', weakness: 'Fire', abilities: 'Shield Dust' },
    { name: 'kakuna', number: '014', type1: 'Bug', weakness: 'Fire', abilities: 'Shed Skin' },
    { name: 'beedrill', number: '015', type1: 'Bug', weakness: 'Fire', abilities: 'Swarm' },
    { name: 'pidgey', number: '016', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet' },
    { name: 'pidgeotto', number: '017', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet' },
    { name: 'pidgeot', number: '018', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet' },
    { name: 'rattata', number: '019', type1: 'Normal', weakness: 'Fighting', abilities: 'Run Away & Guts' },
    { name: 'raticate', number: '020', type1: 'Normal', weakness: 'Fighting', abilities: 'Run Away & Guts' }
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
var nameInput = document.getElementById("pokemon-name-search-box");
var numInput = document.getElementById("pokemon-num-search-box");

const popup = document.querySelector("#popup");
const openPopUP = document.querySelector(".open-button");
const closePopUp = document.querySelector(".close-button");

openPopUP.addEventListener("click", () => {
    popup.showModal();
});

closePopUp.addEventListener("click", () => {
    popup.close();
});

//Search results on "enter" key
nameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        popup.showModal();
    }
});

numInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        popup.showModal();
    }
});

//load pokemons by names
const list = document.getElementById('list');

function setList(PkNames) {
    clearList();
    for (const pokemon of PkNames) {
        const item = document.createElement('li');
        item.classList.add('search-list-item');
        const pokemonInfo = document.createTextNode("\nName: " + pokemon.name + "\nNumber: " + pokemon.number + "\nType 1: " + pokemon.type1 + "\nWeakness: " + pokemon.weakness + "\nAbilities: " + pokemon.abilities);    
        item.appendChild(pokemonInfo);
        list.appendChild(item);
    }

    if (PkNames.length === 0) {
        console.log('no result')
        setNoResult();
    }

    for (const pokemon of PkNums) {
        const item = document.createElement('li');
        item.classList.add('num-search-list-item')
        const pokemonInfo = document.createTextNode("\nName: " + pokemon.name + "\nNumber: " + pokemon.number + "\nType 1: " + pokemon.type1 + "\nWeakness: " + pokemon.weakness + "\nAbilities: " + pokemon.abilities);
        item.appendChild(pokemon);
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
        setList(names.filter(pokemon => {
            return pokemon.number.includes(value);
        }));
    } else {
        clearList();
    }
});
