import "./ItemCard.css";

const ItemCard = ({ name, quantity, purpose }) => {
	return (
		<>
			<h2 className="title">{name}</h2>

			<p className="detail">Quantity: {quantity}</p>
			<p className="detail">Purpose: {purpose}</p>
		</>
	);
};

export default ItemCard;
