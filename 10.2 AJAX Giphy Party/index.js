// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// Get reference to HTML elements
const searchTextField = document.getElementById("search-textfield");
const searchGifButton = document.getElementById("search-gifs-btn");
const removeGifsButton = document.getElementById("remove-gifs-btn");
const resultsDisplay = document.getElementById("results-display");

// Add event listeners
searchGifButton.addEventListener("click", searchGifs);
removeGifsButton.addEventListener("click", removeGifs);

// Event functions
async function searchGifs(event) {
  event.preventDefault();

  const searchText = searchTextField.value.trim();

  if (searchText) {
    try {
      const response = await getGifs(searchText);
      displayGifs(response.data);
    } catch (error) {
      resultsDisplay.innerHTML =
        "An error occurred while fetching GIFs. Please refresh and try again.";
    }
  } else {
    resultsDisplay.innerHTML = "Please enter a search term.";
  }
}

async function getGifs(query) {
  const response = await axios.get(
    `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=10`
  );
  return response.data;
}

function displayGifs(gifData) {
  resultsDisplay.innerHTML = "";

  if (gifData.length > 0) {
    for (const gif of gifData) {
      const gifUrl = gif.images.fixed_width.url;

      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = "GIF";

      resultsDisplay.appendChild(img);
    }
  } else {
    resultsDisplay.innerHTML = "No GIFs found. Please try another search.";
  }
}

function removeGifs() {
  resultsDisplay.innerHTML = "Search for a GIF to display!";
}
