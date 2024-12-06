import React, { useState, useEffect } from "react";

import "./App.css";

function App({ minDamage = 1, maxDamage = 33 }) {
	// Set Health
	const INITIAL_HEALTH = 100;

	const [playerHealth, setPlayerHealth] = useState(INITIAL_HEALTH);
	const [enemyHealth, setEnemyHealth] = useState(INITIAL_HEALTH);

	// Set Game status
	const GameStatus = {
		ACTIVE_PLAY: "active_play",
		WIN: "win",
		LOSS: "loss",
		DRAW: "draw",
	};

	const [gameStatus, setGameStatus] = useState(GameStatus.ACTIVE_PLAY);

	// Function to change the game state to "win"
	const winGame = () => {
		setGameStatus(GameStatus.WIN);
	};

	// Function to reset the game state to "loss"
	const loseGame = () => {
		setGameStatus(GameStatus.LOSS);
	};

	// Function to reset the game state to "draw"
	const drawGame = () => {
		setGameStatus(GameStatus.DRAW);
	};

	// Game functions
	const randomDamage = () => {
		return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
	};

	const dealDamage = () => {
		const playerDamage = randomDamage();
		const enemyDamage = randomDamage();

		setPlayerHealth((prevHealth) => Math.max(prevHealth - enemyDamage, 0));
		setEnemyHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
	};

	const calculateGameStatus = () => {
		if (playerHealth === 0 && enemyHealth === 0) {
			drawGame();
		} else if (playerHealth === 0) {
			loseGame();
		} else if (enemyHealth === 0) {
			winGame();
		}
	};

	// Monitor for changes in playerHealth and enemyHealth
	useEffect(() => {
		calculateGameStatus();
	}, [playerHealth, enemyHealth]);

	const gameMessage = () => {
		switch (gameStatus) {
			case GameStatus.WIN:
				return "Congratulations!";
			case GameStatus.LOSS:
				return "We'll get them next time!";
			case GameStatus.DRAW:
				return "It's a draw!";
			default:
				return "Engage the enemy!";
		}
	};

	const restartGame = () => {
		setPlayerHealth(INITIAL_HEALTH);
		setEnemyHealth(INITIAL_HEALTH);
		setGameStatus(GameStatus.ACTIVE_PLAY);
	};

	return (
		<div className="main-container">
			<div className="title-container">
				<h1>Space Battle Simulator</h1>
			</div>

			<div className="game-container">
				<div className="player">
					<p>Player Health: {playerHealth}</p>
				</div>

				{gameStatus === GameStatus.ACTIVE_PLAY ? (
					<div className="fire-button">
						<button onClick={dealDamage}>Fire!</button>
					</div>
				) : (
					<div className="restart-button">
						<button onClick={restartGame}>Restart</button>
					</div>
				)}

				<div className="enemy">
					<p>Enemy Health: {enemyHealth}</p>
				</div>
			</div>

			<div className="message-container">
				<p>{gameMessage()}</p>
			</div>
		</div>
	);
}

export default App;
