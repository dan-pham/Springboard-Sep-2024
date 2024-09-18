// 1) Get a fact about your favorite number
const number = 12;

function getNumberFact(number, callback) {
    let baseURL = "http://numbersapi.com";

    fetch(`${baseURL}/${number}?json`)
    .then(response => response.json())
    .then(data => {
        if (data.text) {
            callback(null, data.text);
        } else {
            callback("No data available", null);
        }
    })
    .catch(error => {
        callback(error, null);
    });
}

function handleData(error, data) {
    if (error) {
        document.getElementById('section-1-facts').innerHTML += `<p>Error: ${error}</p>`;
        console.error("Error fetching data: ", error);
        return;
    }

    document.getElementById('section-1-facts').innerHTML += `<p>${data}</p>`;
}

getNumberFact(number, handleData);


// 2) Get multiple numbers in a single request
const numbers = [2, 12, 13];

function getMultipleNumberFacts(numbers, callback) {
    let baseURL = "http://numbersapi.com";
    let numbersString = numbers.join(',');

    fetch(`${baseURL}/${numbersString}?json`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            callback(null, data);
        } else {
            callback("No data available", null);
        }
    })
    .catch(error => {
        callback(error, null);
    });
}

function handleMultipleData(error, data) {
    if (error) {
        document.getElementById('section-2-facts').innerHTML += `<p>Error: ${error}</p>`;
        console.error("Error fetching data: ", error);
        return;
    }

    for (let fact in data) {
        document.getElementById('section-2-facts').innerHTML += `<p>${data[fact]}</p>`;
    }
}

getMultipleNumberFacts(numbers, handleMultipleData);


// 3) Get 4 facts on your favorite number
const numberOfFacts = 4

function getMultipleFactsAboutNumber(number, count, callback) {
    let facts = [];
    let completedRequests = 0;

    for (let i = 0; i < count; i++) {
        getNumberFact(number, (error, fact) => {
            completedRequests++;

            if (error) {
                facts.push("Error fetching data: ", error);
            } else {
                facts.push(fact);
            }

            if (completedRequests === count) {
                callback(facts);
            }
        });
    }
}

function handleMultipleFacts(facts) {
    facts.forEach(fact => {
        document.getElementById('section-3-facts').innerHTML += `<p>${fact}</p>`;
    });
}

getMultipleFactsAboutNumber(number, numberOfFacts, handleMultipleFacts);