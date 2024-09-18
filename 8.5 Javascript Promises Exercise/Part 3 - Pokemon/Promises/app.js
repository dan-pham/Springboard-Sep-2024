// 1) Get all Pokemon names and URLs
const baseURL = "https://pokeapi.co/api/v2/pokemon";

function getAllPokemon() {
  return fetch(`${baseURL}?limit=10000`)
    .then((response) => response.json())
    .then((data) => {
      const allPokemon = data.results;
      // console.log(allPokemon);
      return allPokemon;
    })
    .catch((error) => {
      console.error("Error fetching Pokémon: ", error);
    });
}

// getAllPokemon();

// 2) Get 3 random Pokemon
const numberOfPokemon = 3;
let randomPokemon = [];

function getRandomPokemon(allPokemon) {
  randomPokemon = [];
  while (randomPokemon.length < numberOfPokemon) {
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    const random = allPokemon[randomIndex];
    if (!randomPokemon.includes(random)) {
      randomPokemon.push(random);
    }
  }
}

function fetchPokemonData() {
  return Promise.all(
    randomPokemon.map((pokemon) =>
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          console.log(`Data for ${data.name}:`, data);
          return data;
        })
        .catch((error) => {
          console.error("Error fetching data for ${pokemon.name}: ", error);
        })
    )
  );
}

/*
getAllPokemon().then((allPokemon) => {
  getRandomPokemon(allPokemon);
  fetchPokemonData(randomPokemon);
});
*/

// 3) Get Pokemon species descriptions

let pokemonSpeciesData = [];

function fetchPokemonSpecies() {
  pokemonSpeciesData = [];

  return fetchPokemonData().then((pokemonDetails) => {
    return Promise.all(
      pokemonDetails.map((pokemonData) => {
        const speciesUrl = pokemonData.species.url;
        return fetch(speciesUrl)
          .then((response) => response.json())
          .then((speciesData) => {
            const description = getEnglishDescription(speciesData);
            pokemonSpeciesData.push({
              name: pokemonData.name,
              imageUrl: pokemonData.sprites.front_default,
              description: description,
            });

            console.log(`${pokemonData.name}: ${description}`);
          })
          .catch((error) => {
            console.error(
              `Error fetching species data for ${pokemonData.name}: `,
              error
            );
          });
      })
    );
  });
}

function getEnglishDescription(speciesData) {
  const flavorTextEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  return flavorTextEntry
    ? flavorTextEntry.flavor_text
    : "No description available.";
}

/*
getAllPokemon().then((allPokemon) => {
  getRandomPokemon(allPokemon);
  return fetchPokemonSpecies();
});
*/

// 4) Pokemon UI

const pokemonContainer = document.getElementById("pokemon-container");

function displayPokemon(pokemonInfo) {
  if (pokemonContainer.children.length < numberOfPokemon) {
    for (let i = 0; i < numberOfPokemon; i++) {
      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      pokemonContainer.appendChild(card);
    }
  }

  pokemonInfo.forEach((pokemon, index) => {
    const card = pokemonContainer.children[index];
    if (card) {
      updatePokemonCard(
        card,
        pokemon.name,
        pokemon.imageUrl,
        pokemon.description
      );
    } else {
      console.error(`Card at index ${index} does not exist.`);
    }
  });
}

function updatePokemonCard(card, name, imageUrl, description) {
  if (card) {
    card.innerHTML = `
    <h3>${name}</h3>
    <img src="${imageUrl}" alt="${name}">
    <p>${description}</p>
  `;
  } else {
    console.error("Card element is undefined.");
  }
}

document
  .getElementById("request-pokemon-button")
  .addEventListener("click", () => {
    getAllPokemon()
      .then((allPokemon) => {
        getRandomPokemon(allPokemon);
        return fetchPokemonSpecies();
      })
      .then(() => {
        displayPokemon(pokemonSpeciesData);
      })
      .catch((error) => {
        console.error("Error during Pokémon generation: ", error);
      });
  });
