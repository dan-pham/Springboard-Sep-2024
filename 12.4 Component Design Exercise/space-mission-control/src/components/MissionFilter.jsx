import "../styles/MissionFilter.css";

const Filters = {
	ALL: "All",
	PLANNED: "Planned",
	ACTIVE: "Active",
	COMPLETED: "Completed",
};

const MissionFilter = ({ filter }) => {
	return (
		<div className="filters-container">
			{Object.entries(Filters).map(([key, value]) => (
				<button className="filter-button" key={key} onClick={() => filter(value)}>
					{value}
				</button>
			))}
		</div>
	);
};

export default MissionFilter;
export { Filters };
