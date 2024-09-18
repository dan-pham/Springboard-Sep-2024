// 1) Get a fact about your favorite number
const number = 12;

async function getNumberFact(number) {
  let baseURL = "http://numbersapi.com";

  try {
    const response = await fetch(`${baseURL}/${number}?json`);
    const data = await response.json();
    if (data.text) {
      return data.text;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function displayNumberFact() {
  try {
    const fact = await getNumberFact(number);
    document.getElementById("section-1-facts").innerHTML += `<p>${fact}</p>`;
  } catch (error) {
    document.getElementById(
      "section-1-facts"
    ).innerHTML += `<p>Error: ${error}</p>`;
  }
}

displayNumberFact();

// 2) Get multiple numbers in a single request
const numbers = [2, 12, 13];

async function getMultipleNumberFacts(numbers) {
  let baseURL = "http://numbersapi.com";
  let numbersString = numbers.join(",");

  try {
    const response = await fetch(`${baseURL}/${numbersString}?json`);
    const data = await response.json();

    if (data) {
      return data;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function displayMultipleNumberFacts() {
  try {
    const data = await getMultipleNumberFacts(numbers);
    for (let fact in data) {
      document.getElementById(
        "section-2-facts"
      ).innerHTML += `<p>${data[fact]}</p>`;
    }
  } catch (error) {
    document.getElementById(
      "section-2-facts"
    ).innerHTML += `<p>Error: ${error}</p>`;
  }
}

displayMultipleNumberFacts();

// 3) Get 4 facts on your favorite number
const numberOfFacts = 4;

async function getMultipleFactsAboutNumber(number, count) {
  let facts = [];

  try {
    for (let i = 0; i < count; i++) {
      const fact = await getNumberFact(number);
      facts.push(fact);
    }

    return facts;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function displayMultipleFacts() {
  try {
    const facts = await getMultipleFactsAboutNumber(number, numberOfFacts);
    facts.forEach((fact) => {
      document.getElementById("section-3-facts").innerHTML += `<p>${fact}</p>`;
    });
  } catch (error) {
    document.getElementById(
      "section-3-facts"
    ).innerHTML += `<p>Error: ${error}</p>`;
  }
}

displayMultipleFacts();
