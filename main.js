const names = [
    { name: 'bulbasaur', number: '1'},
    { name: 'ivysaur', number: '2' },
    { name: 'venusaur', number: '3' },
    { name: 'charmander', number: '4' },
    { name: 'charmeleon', number: '5' },
    { name: 'charizard', number: '6' },
    { name: 'squirtle', number: '7' },
    { name: 'wartortle', number: '8' },
    { name: 'blastoise', number: '9' },
    { name: 'caterpie', number: '10' },
    { name: 'metapod', number: '11' },
    { name: 'butterfree', number: '12' },
    { name: 'weedle', number: '13' },
    { name: 'kakuna', number: '14' },
    { name: 'beedrill', number: '15' },
    { name: 'pidgey', number: '16' },
    { name: 'pidgeotto', number: '17' },
    { name: 'pidgeot', number: '18' },
    { name: 'rattata', number: '19' },
    { name: 'raticate', number: '20' },
];

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
        const text = document.createTextNode(pokemon.name);
        item.appendChild(text);
        list.appendChild(item);
    }

    if (PkNames.length === 0) {
        console.log('no result')
        setNoResult();
    }

    for (const pokemon of PkNums) {
        const item = document.createElement('li');
        item.classList.add('search-list-item')
        const text = document.createTextNode(pokemon.number);
        item.appendChild(text);
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

const searchInput = document.getElementById('pokemon-search-box');

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
        }).sort((pokemonA, pokemonB) => {
            return getRelevancy(pokemonB.number, value) - getRelevancy(pokemonA.number, value);
        }));
    } else {
        clearList();
    }
});
