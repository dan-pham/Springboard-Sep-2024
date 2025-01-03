import { useEffect, useRef } from "react";
import "./Star.css";

function Star({ id, x, y, onDestroy }) {
	// Persist star without rerendering
	const starRef = useRef(null);

	// If star exists, focus on render
	useEffect(() => {
		if (starRef.current) {
			starRef.current.focus();
		}
	}, []);

	// Destroy star on click
	const handleClick = () => {
		onDestroy(id);
	};

	return (
		<div
			className="Star"
			ref={starRef}
			tabIndex="0"
			onClick={handleClick}
			style={{ left: x, top: y }}
		>
			★
		</div>
	);
}

export default Star;
