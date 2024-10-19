function App() {
	const spacePhenomena = [
		{ id: 1, name: "Asteroid Belt", emoji: "☄️" },
		{ id: 2, name: "Galactic Nebula", emoji: "🌌" },
		{ id: 3, name: "Black Hole", emoji: "🕳️" },
		{ id: 4, name: "Supernova Explosion", emoji: "💥" },
		{ id: 5, name: "Pulsar", emoji: "⚡" },
		{ id: 6, name: "Quasar", emoji: "💫" },
		{ id: 7, name: "Exoplanet", emoji: "🪐" },
		{ id: 8, name: "Interstellar Cloud", emoji: "☁️" },
		{ id: 9, name: "Gamma-Ray Burst", emoji: "🌠" },
		{ id: 10, name: "Magnetic Field Reversal", emoji: "🧲" },
	];

	const observationStatuses = ["🔭 Visible", "🌫 Faint", "🚀 Prime for Study"];

	return (
		<div>
			<h1>Space Phenomena Tracker</h1>
			<ul>
				{spacePhenomena.map((phenomenon) => {
					const randomIndex = Math.floor(Math.random() * observationStatuses.length);
					const randomStatus = observationStatuses[randomIndex];
					const isPrimeForStudy = randomStatus === observationStatuses[2];
					const exciteMessage = " - Bring your advanced equipment!";

					const phenomenonId = phenomenon.id;
					const phenomenonName = phenomenon.name;
					const phenomenonEmoji = phenomenon.emoji;

					return (
						<li key={phenomenonId}>
							{phenomenonEmoji} {phenomenonName} - {randomStatus}
							{isPrimeForStudy ? <em>{exciteMessage}</em> : ""}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
