// 1) Get a fact about your favorite number
const number = 12;

function getNumberFact(number) {
  let baseURL = "http://numbersapi.com";

  return fetch(`${baseURL}/${number}?json`)
    .then((response) => response.json())
    .then((data) => {
      if (data.text) {
        return data.text;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      throw error;
    });
}

getNumberFact(number)
  .then((data) => {
    document.getElementById("section-1-facts").innerHTML += `<p>${data}</p>`;
  })
  .catch((error) => {
    document.getElementById(
      "section-1-facts"
    ).innerHTML += `<p>Error: ${error}</p>`;
  });

// 2) Get multiple numbers in a single request
const numbers = [2, 12, 13];

function getMultipleNumberFacts(numbers) {
  let baseURL = "http://numbersapi.com";
  let numbersString = numbers.join(",");

  return fetch(`${baseURL}/${numbersString}?json`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      throw error;
    });
}

getMultipleNumberFacts(numbers)
  .then((data) => {
    for (let fact in data) {
      document.getElementById(
        "section-2-facts"
      ).innerHTML += `<p>${data[fact]}</p>`;
    }
  })
  .catch((error) => {
    document.getElementById(
      "section-2-facts"
    ).innerHTML += `<p>Error: ${error}</p>`;
  });

// 3) Get 4 facts on your favorite number
const numberOfFacts = 4;

function getMultipleFactsAboutNumber(number, count) {
  let promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(getNumberFact(number));
  }

  return Promise.all(promises)
    .then((facts) => facts)
    .catch((error) => {
      console.error("Error fetching data: ", error);
      return [`Error fetching data: ${error}`];
    });
}

getMultipleFactsAboutNumber(number, numberOfFacts).then((facts) => {
  facts.forEach((fact) => {
    document.getElementById("section-3-facts").innerHTML += `<p>${fact}</p>`;
  });
});
