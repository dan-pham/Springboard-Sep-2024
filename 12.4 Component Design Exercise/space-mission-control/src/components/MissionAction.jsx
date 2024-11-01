import "../styles/MissionAction.css";

const MissionAction = ({ id, updateStatus }) => {
	const Status = {
		ACTIVE: "Active",
		COMPLETED: "Completed",
	};

	return (
		<div className="action-button-container">
			<button className="action-button" onClick={() => updateStatus(id, Status.ACTIVE)}>
				Launch
			</button>

			<button className="action-button" onClick={() => updateStatus(id, Status.COMPLETED)}>
				Complete
			</button>
		</div>
	);
};

export default MissionAction;
