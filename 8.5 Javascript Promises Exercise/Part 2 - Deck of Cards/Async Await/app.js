// 1) Request a single card from a newly shuffled deck
const baseURL = "http://deckofcardsapi.com/api/deck";

async function getCardFromDeck() {
  try {
    // Shuffle deck
    const deckResponse = await fetch(`${baseURL}/new/shuffle/?deck_count=1`);
    const deckData = await deckResponse.json();
    const deckId = deckData.deck_id;

    // Draw card
    const cardResponse = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
    const cardData = await cardResponse.json();

    if (cardData.cards && cardData.cards.length > 0) {
      const card = cardData.cards[0];
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    } else {
      console.log("No card drawn.");
    }
  } catch (error) {
    console.error("Error fetching card: ", error);
  }
}

getCardFromDeck();

// 2) Request two cards from the same deck

async function getTwoCardsFromDeck() {
  try {
    // Shuffle deck
    const deckResponse = await fetch(`${baseURL}/new/shuffle/?deck_count=1`);
    const deckData = await deckResponse.json();
    const deckId = deckData.deck_id;

    // Draw first card
    const firstCardResponse = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
    const firstCardData = await firstCardResponse.json();

    if (!firstCardData.cards || firstCardData.cards.length === 0) {
      console.log("No card drawn.");
      return;
    }

    // Draw second card
    const secondCardResponse = await fetch(
      `${baseURL}/${deckId}/draw/?count=1`
    );
    const secondCardData = await secondCardResponse.json();

    if (secondCardData.cards && secondCardData.cards.length > 0) {
      const firstCard = firstCardData.cards[0];
      const secondCard = secondCardData.cards[0];
      console.log(
        `${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}, ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`
      );
    } else {
      console.log("No second card drawn.");
      return;
    }
  } catch (error) {
    console.error("Error fetching card: ", error);
  }
}

getTwoCardsFromDeck();

// 3) Draw from a new deck until there are no cards left

let deckId = null;

async function createDeck() {
  try {
    const response = await fetch(`${baseURL}/new/shuffle/?deck_count=1`);
    const data = await response.json();
    deckId = data.deck_id;
  } catch (error) {
    console.error("Error creating deck: ", error);
  }
}

async function drawCard() {
  if (!deckId) {
    console.error("Error getting the same deck: ", error);
    return;
  }

  try {
    const response = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
    const data = await response.json();

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
    } else {
      console.log("No card drawn.");
    }
  } catch (error) {
    console.error("Error drawing card: ", error);
  }
}

createDeck().then(() => {
  document
    .getElementById("draw-card-button")
    .addEventListener("click", drawCard);
});
