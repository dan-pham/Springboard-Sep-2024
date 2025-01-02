export const DECK_API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export const NEW_DECK_URL = `${DECK_API_BASE_URL}/new/shuffle/`;

export const DRAW_CARD_URL = (deckId) => `${DECK_API_BASE_URL}/${deckId}/draw/?count=1`;
