import "./ItemAction.css";

const ItemAction = ({ itemId, onDelete }) => {
	return (
		<>
			<button className="delete-button" onClick={() => onDelete(itemId)}>
				Delete
			</button>
		</>
	);
};

export default ItemAction;
