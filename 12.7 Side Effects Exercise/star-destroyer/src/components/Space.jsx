import { useState, useEffect } from "react";
import Star from "./Star.jsx";
import { v4 as uuidv4 } from "uuid";
import "./Space.css";

function Space() {
	const STAR_SIZE = 40;

	// Array to keep track of stars
	const [stars, setStars] = useState([]);

	// Generate stars at random positions
	const generateStar = () => {
		const id = uuidv4();
		const x = Math.random() * (window.innerWidth - STAR_SIZE);
		const y = Math.random() * (window.innerHeight - STAR_SIZE);

		const star = { id: id, x: x, y: y };

		setStars((prevStars) => [...prevStars, star]);
	};

	// Destroy a star by ID
	const destroyStar = (id) => {
		setStars((prevStars) => prevStars.filter((star) => star.id !== id));
	};

	// Add a new star every 2.5 seconds beginning on mount
	useEffect(() => {
		const intervalId = setInterval(() => {
			generateStar();
		}, 2500);

		// Clean up interval on unmount to avoid memory leaks
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="Space">
			{stars.map((star) => (
				<Star key={star.id} id={star.id} x={star.x} y={star.y} onDestroy={destroyStar} />
			))}
		</div>
	);
}

export default Space;
