import { useState } from "react";

import MissionAction from "./MissionAction.jsx";
import MissionCard from "./MissionCard.jsx";
import MissionFilter, { Filters } from "./MissionFilter.jsx";

import "../styles/MissionControl.css";

const MissionControl = ({ initialMissions }) => {
	const [filter, setFilter] = useState(Filters.ALL);
	const [missions, setMissions] = useState(initialMissions);

	const filteredMissions = missions.filter(
		(mission) => filter === Filters.ALL || mission.status === filter
	);

	function updateStatus(id, newStatus) {
		setMissions((prevMissions) =>
			prevMissions.map((mission) =>
				mission.id === id ? { ...mission, status: newStatus } : mission
			)
		);
	}

	return (
		<div className="mission-control">
			<h1>Space Mission Control</h1>

			<div>
				<MissionFilter filter={setFilter} />
			</div>

			{filteredMissions.map((mission) => {
				const { id, name, status, crew } = mission;

				return (
					<div className="mission-container">
						<MissionCard name={name} status={status} crew={crew} />
						<MissionAction id={id} updateStatus={updateStatus} />
					</div>
				);
			})}
		</div>
	);
};

export default MissionControl;
