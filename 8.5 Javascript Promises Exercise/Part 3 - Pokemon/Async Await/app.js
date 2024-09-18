// 1) Get all Pokemon names and URLs
const baseURL = "https://pokeapi.co/api/v2/pokemon";

async function getAllPokemon() {
  try {
    const response = await fetch(`${baseURL}?limit=10000`);
    const data = await response.json();
    const allPokemon = data.results;
    console.log(allPokemon);
    return allPokemon;
  } catch (error) {
    console.error("Error fetching Pokémon: ", error);
  }
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

async function fetchPokemonData() {
  try {
    const promises = randomPokemon.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      console.log(`Data for ${data.name}:`, data);
      return data;
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching Pokémon data: ", error);
  }
}

/*
getAllPokemon().then((allPokemon) => {
  getRandomPokemon(allPokemon);
  fetchPokemonData(randomPokemon);
});
*/

// 3) Get Pokemon species descriptions

let pokemonSpeciesData = [];

async function fetchPokemonSpecies() {
  pokemonSpeciesData = [];

  try {
    const pokemonDetails = await fetchPokemonData();
    const promises = pokemonDetails.map(async (pokemonData) => {
      try {
        const speciesUrl = pokemonData.species.url;
        const response = await fetch(speciesUrl);
        const speciesData = await response.json();
        const description = getEnglishDescription(speciesData);

        pokemonSpeciesData.push({
          name: pokemonData.name,
          imageUrl: pokemonData.sprites.front_default,
          description: description,
        });

        console.log(`${pokemonData.name}: ${description}`);
      } catch (error) {
        console.error(
          `Error fetching species data for ${pokemonData.name}: `,
          error
        );
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching Pokémon species: ", error);
  }
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
  .addEventListener("click", async () => {
    try {
      const allPokemon = await getAllPokemon();
      getRandomPokemon(allPokemon);
      await fetchPokemonSpecies();
      displayPokemon(pokemonSpeciesData);
    } catch (error) {
      console.error("Error during Pokémon generation: ", error);
    }
  });
