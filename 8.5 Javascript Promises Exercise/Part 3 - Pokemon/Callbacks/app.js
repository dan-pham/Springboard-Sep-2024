// 1) Get all Pokemon names and URLs
const baseURL = "https://pokeapi.co/api/v2/pokemon";

function getAllPokemon(callback) {
  fetch(`${baseURL}?limit=10000`)
    .then((response) => response.json())
    .then((data) => {
      const allPokemon = data.results;
      callback(null, allPokemon);
    })
    .catch((error) => {
      console.error("Error fetching Pokémon: ", error);
      callback(error);
    });
}

/*
getAllPokemon((error, allPokemon) => {
  if (error) {
    console.error("Error getting all Pokémon: ", error);
    return;
  }

  console.log(allPokemon);
});
*/

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

function fetchPokemonData(callback) {
  const promises = randomPokemon.map((pokemon) =>
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(`Error fetching data for ${pokemon.name}: `, error);
      })
  );

  Promise.all(promises)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
}

/*
getAllPokemon((error, allPokemon) => {
  if (error) {
    console.error("Error getting all Pokémon: ", error);
    return;
  }

  getRandomPokemon(allPokemon);

  fetchPokemonData((error, randomPokemon) => {
    if (error) {
      console.error("Error fetching Pokémon data: " + error);
      return;
    }

    randomPokemon.forEach((pokemon) => {
      console.log(`Data for ${pokemon.name}: `, pokemon);
    });
  });
});
*/

// 3) Get Pokemon species descriptions

let pokemonSpeciesData = [];

function fetchPokemonSpecies(callback) {
  pokemonSpeciesData = [];

  fetchPokemonData((error, pokemonDetails) => {
    if (error) {
      callback(error);
      return;
    }

    const promises = pokemonDetails.map((pokemonData) => {
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
        })
        .catch((error) => {
          console.error(
            `Error fetching species data for ${pokemonData.name}: `,
            error
          );
        });
    });

    Promise.all(promises)
      .then(() => callback(null))
      .catch((error) => callback(error));
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
getAllPokemon((error, allPokemon) => {
  if (error) {
    console.error("Error getting all Pokémon: ", error);
    return;
  }

  getRandomPokemon(allPokemon);
  fetchPokemonSpecies((error) => {
    if (error) {
      console.error("Error fetching Pokémon species: ", error);
      return;
    }

    pokemonSpeciesData.forEach((pokemon) => {
      console.log(`${pokemon.name}: ${pokemon.description}`);
    });
  });
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
    getAllPokemon((error, allPokemon) => {
      if (error) {
        console.error("Error getting all Pokémon: ", error);
        return;
      }

      getRandomPokemon(allPokemon);

      fetchPokemonSpecies((error) => {
        if (error) {
          console.error("Error fetching Pokémon species: ", error);
          return;
        }

        displayPokemon(pokemonSpeciesData);
      });
    });
  });
