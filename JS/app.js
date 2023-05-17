let pokemonInputValue = '1';
let lastPokemonId = 0;
let isHandleKeyDownActivated = false;

// Chama a função searchPokemon com o valor inicial
searchPokemon(pokemonInputValue);

// Função que verifica qual é o último pokemon da API
async function getLastPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
  const data = await response.json();
  const lastPokemonURL = data.results[data.results.length - 1].url;
  lastPokemonId = lastPokemonURL.split('/').slice(-2, -1)[0];
}

// Chama a função getLastPokemon para verificar o último pokemon da API
getLastPokemon();

async function searchPokemon(pokemonInput) {
  const pokemonName = document.querySelector('.pokemonName');
  const pokemonId = document.querySelector('.pokemonNumber');
  const pokemonImage = document.querySelector('.pokemonImage');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
  const data = await response.json();

  // Envia os dados para a tela
  pokemonName.innerHTML = data['name'];
  pokemonId.innerHTML = data['id'];
  pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

  // Variável global recebe ID do pokemon para navegar entre os botões "Prev <" e "Next >"
  pokemonInputValue = (data['id']);
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !(event.target.value.trim() === '')) {
    event.preventDefault();
    const pokemonId = document.getElementById('pokemonInput').value.toLowerCase(); 
    searchPokemon(pokemonId);

    // Acende o círculos
    const circleOne = document.querySelector('.prevButtonLight');
    const circleTwo = document.querySelector('.nextButtonLight');
    circleOne.classList.add('lit');
    circleTwo.classList.add('lit');

    // Remove a classe "lit" após 200ms
    setTimeout(() => {
      circleOne.classList.remove('lit');
      circleTwo.classList.remove('lit');
    }, 200);
  }  
}

function handleNext() {
  if (pokemonInputValue == lastPokemonId) {
    const nextPokemonId = '1';
    pokemonInputValue = nextPokemonId.toString();
    searchPokemon(pokemonInputValue);
  } else {
    const nextPokemonId = Number(pokemonInputValue) + 1;
    pokemonInputValue = nextPokemonId.toString();
    searchPokemon(pokemonInputValue);
  }
    // Acende o círculo
    const circle = document.querySelector('.nextButtonLight');
    circle.classList.add('lit');
  
    // Remove a classe "lit" após 200ms
    setTimeout(() => {
      circle.classList.remove('lit');
    }, 200);
}

function handlePrev() {
  if (pokemonInputValue == '1') {
    const prevPokemonId = lastPokemonId;
    pokemonInputValue = prevPokemonId.toString();
    searchPokemon(pokemonInputValue);
  } else {
    const prevPokemonId = Number(pokemonInputValue) - 1;
    pokemonInputValue = prevPokemonId.toString();
    searchPokemon(pokemonInputValue);
  }
   // Acende o círculo
   const circle = document.querySelector('.prevButtonLight');
   circle.classList.add('lit');
 
   // Remove a classe "lit" após 200ms
   setTimeout(() => {
     circle.classList.remove('lit');
   }, 200);
}

var audio = document.getElementById("myAudio");

function toggleSound() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function increaseVolume() {
  if (audio.volume < 1.0) {
    audio.volume += 0.1;
  }
}

function decreaseVolume() {
  if (audio.volume > 0.0) {
    audio.volume -= 0.1;
  }
}

// Associando eventos aos botões
document.getElementById('nextButton').onclick = handleNext;
document.getElementById('prevButton').onclick = handlePrev;