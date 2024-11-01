import "../styles/MissionCard.css";

const MissionCard = ({ name, status, crew }) => {
	const crewMembers = crew.join(", ");
	return (
		<div className="mission-card">
			<h3>{name}</h3>
			<p>Status: {status}</p>
			<p>Crew: {crewMembers}</p>
		</div>
	);
};

export default MissionCard;
