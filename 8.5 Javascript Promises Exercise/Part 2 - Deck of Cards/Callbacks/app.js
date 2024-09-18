// 1) Request a single card from a newly shuffled deck
const baseURL = "http://deckofcardsapi.com/api/deck";

function getCardFromDeck(callback) {
  // Shuffle deck
  fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((deckResponse) => deckResponse.json())
    .then((deckData) => {
      const deckId = deckData.deck_id;

      // Draw card
      return fetch(`${baseURL}/${deckId}/draw/?count=1`);
    })
    .then((cardResponse) => cardResponse.json())
    .then((cardData) => {
      if (cardData.cards && cardData.cards.length > 0) {
        const card = cardData.cards[0];
        callback(
          null,
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      } else {
        callback("No card drawn.", null);
      }
    })
    .catch((error) => callback("Error fetching card: " + error, null));
}

getCardFromDeck((error, card) => {
  if (error) {
    console.error(error);
  } else {
    console.log(card);
  }
});

// 2) Request two cards from the same deck

function getTwoCardsFromDeck(callback) {
  // Shuffle deck
  return fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((deckResponse) => deckResponse.json())
    .then((deckData) => {
      const deckId = deckData.deck_id;

      // Draw first card
      return fetch(`${baseURL}/${deckId}/draw/?count=1`)
        .then((firstCardResponse) => firstCardResponse.json())
        .then((firstCardData) => {
          if (!firstCardData.cards || firstCardData.cards.length === 0) {
            callback("No card drawn.", null);
            return Promise.reject("No first card drawn.");
          }

          // Draw second card
          return fetch(`${baseURL}/${deckId}/draw/?count=1`)
            .then((secondCardResponse) => secondCardResponse.json())
            .then((secondCardData) => {
              if (secondCardData.cards && secondCardData.cards.length > 0) {
                const firstCard = firstCardData.cards[0];
                const secondCard = secondCardData.cards[0];
                callback(
                  null,
                  `${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}, ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`
                );
              } else {
                callback("No second card drawn.", null);
              }
            });
        });
    })
    .catch((error) => callback("Error fetching card: " + error, null));
}

getTwoCardsFromDeck((error, cards) => {
  if (error) {
    console.error(error);
  } else {
    console.log(cards);
  }
});

// 3) Draw from a new deck until there are no cards left

let deckId = null;

function createDeck(callback) {
  fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      callback(null);
    })
    .catch((error) => callback("Error creating deck: " + error));
}

function drawCard(callback) {
  if (!deckId) {
    callback("Deck not created", null);
    return;
  }

  fetch(`${baseURL}/${deckId}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cards && data.cards.length > 0) {
        const card = data.cards[0];
        const cardElement = document.createElement("img");
        cardElement.src = card.image;
        cardElement.alt = `${card.value} of ${card.suit}`;
        cardElement.style.position = "absolute";

        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 10 - 5;
        let randomY = Math.random() * 10 - 5;
        cardElement.style.transform = `rotate(${angle}deg) translate(${randomX}px, ${randomY}px)`;

        document.getElementById("card-container").appendChild(cardElement);

        if (data.remaining === 0) {
          document.getElementById("draw-card-button").disabled = true;
          document.getElementById("draw-card-button").innerText =
            "No more cards!";
        }
        callback(null);
      } else {
        callback("No card drawn.", null);
      }
    })
    .catch((error) => callback("Error drawing card: " + error, null));
}

createDeck((error) => {
  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("draw-card-button").addEventListener("click", () => {
    drawCard((error) => {
      if (error) {
        console.error(error);
      }
    });
  });
});
