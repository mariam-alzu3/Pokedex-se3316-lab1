const names = [
    { name: 'bulbasaur', number: '001', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow', rarity: '4' },
    { name: 'ivysaur', number: '002', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow', rarity: '5' },
    { name: 'venusaur', number: '003', type1: 'Grass', weakness: 'Fire', abilities: 'Overgrow', rarity: '6' },
    { name: 'charmander', number: '004', type1: 'Fire', weakness: 'Water', abilities: 'Blaze', rarity: '4' },
    { name: 'charmeleon', number: '005', type1: 'Fire', weakness: 'Water', abilities: 'Blaze', rarity: '5' },
    { name: 'charizard', number: '006', type1: 'Fire', weakness: 'Water', abilities: 'Blaze', rarity: '6' },
    { name: 'squirtle', number: '007', type1: 'Water', weakness: 'Grass', abilities: 'Torrent', rarity: '4' },
    { name: 'wartortle', number: '008', type1: 'Water', weakness: 'Grass', abilities: 'Torrent', rarity: '5' },
    { name: 'blastoise', number: '009', type1: 'Water', weakness: 'Grass', abilities: 'Torrent', rarity: '6' },
    { name: 'caterpie', number: '010', type1: 'Bug', weakness: 'Fire', abilities: 'Shield Dust', rarity: '1' },
    { name: 'metapod', number: '011', type1: 'Bug', weakness: 'Fire', abilities: 'Shed Skin', rarity: '3' },
    { name: 'butterfree', number: '012', type1: 'Bug', weakness: 'Fire', abilities: 'Compound Eyes', rarity: '4' },
    { name: 'weedle', number: '013', type1: 'Bug', weakness: 'Fire', abilities: 'Shield Dust', rarity: '1' },
    { name: 'kakuna', number: '014', type1: 'Bug', weakness: 'Fire', abilities: 'Shed Skin', rarity: '3' },
    { name: 'beedrill', number: '015', type1: 'Bug', weakness: 'Fire', abilities: 'Swarm', rarity: '4' },
    { name: 'pidgey', number: '016', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet', rarity: '1' },
    { name: 'pidgeotto', number: '017', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet', rarity: '3' },
    { name: 'pidgeot', number: '018', type1: 'Normal', weakness: 'Electric', abilities: 'Keen Eye & Tangled Feet', rarity: '4' },
    { name: 'rattata', number: '019', type1: 'Normal', weakness: 'Fighting', abilities: 'Run Away & Guts', rarity: '1' },
    { name: 'raticate', number: '020', type1: 'Normal', weakness: 'Fighting', abilities: 'Run Away & Guts', rarity: '4' }
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

// searchbox accepts numbers only between 1 and 20
setInputFilter(document.getElementById("pokemon-num-search-box"), function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 20) && (value === "" || parseInt(value) >= 1);
}, "Please Enter A Number between 1 and 20");

//searchbox accepts letters from a-z or A-Z
setInputFilter(document.getElementById("pokemon-name-search-box"), function (value) {
    return /^[a-z]*$/i.test(value);
}, "Please Enter A Character from A-Z ");

//Pop-Up
var nameInput = document.getElementById("pokemon-name-search-box");     //name searchbox
var numInput = document.getElementById("pokemon-num-search-box");       //numbers searchbox

const popup = document.querySelector("#popup");                     //pop-up
const openPopUP = document.querySelector(".open-button");           //search button to open the popup
const closePopUp = document.querySelector(".close-button");         //exit button closes the popup

openPopUP.addEventListener("click", () => {                         //clicking the search button shows the popup
    popup.showModal();
});

closePopUp.addEventListener("click", () => {
    popup.close();                                                  //clicking the exit button closes the popup
});

//Search results on "enter" key for name search box
nameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        popup.showModal();
    }
});

//Search results on "enter" key for number search box
numInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        popup.showModal();
    }
});

//load pokemons by names
const list = document.getElementById('list');               //list to store pokemons in

function setList(PkNames) {
    clearList();
    for (const pokemon of PkNames) {                        
        const item = document.createElement('li');          //creates a new list based on the name searches
        item.classList.add('search-list-item');             //adds results to list by the id of 'search-list-item'
        //pokemon info to be displayed in the popup
        const pokemonInfo = document.createTextNode("\nName: " + pokemon.name + "\nNumber: " + pokemon.number + "\nType 1: " + pokemon.type1 + "\nWeakness: " + pokemon.weakness + "\nAbilities: " + pokemon.abilities + "\nRarity: " + pokemon.rarity);   
        item.appendChild(pokemonInfo);                      //adds a node of the pokemon info to the the list
        list.appendChild(item);                             //adds the pokemon info list to the list that is in the popup
    }

    if (PkNames.length === 0) {                             //if no pokemons matches the search then show "no results"
        setNoResult();                                      //calls the function NoResult
    }

    for (const pokemon of PkNums) {                         //creates a list of pokemons based on the number searches
        const item = document.createElement('li');
        item.classList.add('num-search-list-item')
        const pokemonInfo = document.createTextNode("\nName: " + pokemon.name + "\nNumber: " + pokemon.number + "\nType 1: " + pokemon.type1 + "\nWeakness: " + pokemon.weakness + "\nAbilities: " + pokemon.abilities);
        item.appendChild(pokemon);
        list.appendChild(item);
    }
}


function clearList() {                                      //clears the list of older searches
    while (list.firstChild) {
        list.removeChild(list.firstChild);                  
    }
}

function setNoResult() {                                    //function to show No Results when no search results are found
    const item = document.createElement('li');
    item.classList.add('search-list-item')
    const text = document.createTextNode("No Results Found");
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {                       //goes through the list and checks if its exact, starts with or has the letter/s searched   
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
        setList(names.filter(pokemon => {                                   //filters the arrays based on the search
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
