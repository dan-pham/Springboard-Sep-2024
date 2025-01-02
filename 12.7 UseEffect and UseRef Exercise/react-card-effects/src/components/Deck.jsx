import React, { useState, useEffect, useRef } from "react";
import { NEW_DECK_URL, DRAW_CARD_URL } from "../urls";
import Card from "./Card";
import "./Deck.css";

function Deck() {
	const [deckId, setDeckId] = useState(null);
	const [remainingCards, setRemainingCards] = useState(0);

	const [cards, setCards] = useState([]);
	const [cardName, setCardName] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const intervalRef = useRef(null);

	// Fetch a new deck
	const fetchDeck = async () => {
		try {
			// Set loading state and remove all cards
			setIsLoading(true);
			setCards([]);

			// Fetch JSON
			const response = await fetch(NEW_DECK_URL);
			const data = await response.json();

			// Set decoded JSON
			setDeckId(data.deck_id);
			setRemainingCards(data.remaining);
		} catch (error) {
			// Return error
			console.error("Error fetching deck: ", error);
		} finally {
			// Clear loading state
			setIsLoading(false);
		}
	};

	// Fetch initial deck on mount
	useEffect(() => {
		fetchDeck();
	}, []);

	// Draw card
	const drawCard = async () => {
		// Check for remaining cards in deck
		if (remainingCards > 0) {
			try {
				// Fetch JSON
				const response = await fetch(DRAW_CARD_URL(deckId));
				const data = await response.json();

				// Set decoded JSON
				const card = data.cards[0];
				setCards((cards) => [
					...cards,
					{
						id: card.code,
						name: card.value + " of " + card.suit,
						image: card.image,
					},
				]);

				setRemainingCards(data.remaining);
				console.log("Remaining cards: ", data.remaining);
			} catch (error) {
				// Return error
				console.error("Error drawing card: ", error);
			}
		} else {
			// Show alert for empty deck
			alert("Error: no cards remaining!");
		}
	};

	const startDrawing = () => {
		if (isDrawing || remainingCards <= 0) return;

		if (remainingCards <= 0) {
			// Show alert for empty deck
			alert("Error: no cards remaining!");
			return;
		}

		setIsDrawing(true);

		intervalRef.current = setInterval(async () => {
			// If no more cards, stop task
			if (remainingCards <= 0) {
				clearInterval(intervalRef.current);
				setIsDrawing(false);
				return;
			}

			try {
				// Fetch JSON
				const response = await fetch(DRAW_CARD_URL(deckId));
				const data = await response.json();

				// Set decoded JSON
				const card = data.cards[0];
				setCards((cards) => [
					...cards,
					{
						id: card.code,
						name: card.value + " of " + card.suit,
						image: card.image,
					},
				]);

				setRemainingCards(data.remaining);
				console.log("Remaining cards: ", data.remaining);

				if (data.remaining === 0) {
					clearInterval(intervalRef.current);
					setIsDrawing(false);
					alert("Error: no cards remaining!");
					return;
				}
			} catch (error) {
				// Return error
				console.error("Error drawing card: ", error);
			}
		}, 1000); // Draw a card every second
	};

	const stopDrawing = () => {
		clearInterval(intervalRef.current);
		setIsDrawing(false);
	};

	const handleDrawAction = () => {
		isDrawing ? stopDrawing() : startDrawing();
	};

	return (
		<div className="Deck">
			{deckId && (
				<>
					<button className="draw-btn" onClick={handleDrawAction}>
						{isDrawing ? "Stop drawing" : "Start drawing"}
					</button>
					<button className="fetch-btn" onClick={fetchDeck} disabled={isLoading || isDrawing}>
						{isLoading ? "Shuffling..." : "Shuffle"}
					</button>

					<div className="card-container">
						{cards.map((card) => (
							<Card key={card.id} name={card.name} image={card.image} />
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Deck;
