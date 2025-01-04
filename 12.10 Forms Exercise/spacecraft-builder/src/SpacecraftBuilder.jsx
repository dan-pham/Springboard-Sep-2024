import { useState } from "react";

import ItemForm from "./ItemForm.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";

const SpacecraftBuilder = () => {
	// Manage state of inventory
	const [inventory, setInventory] = useState([]);

	// Add item to inventory
	const addItem = (item) => {
		setInventory((prevInventory) => [...prevInventory, item]);
	};

	// Delete item from inventory
	const deleteItem = (itemId) => {
		setInventory((prevInventory) => prevInventory.filter((item) => item.id !== itemId));
	};

	// Render ItemForm to allow item submission
	// Render InventoryDisplay to showcase inventory items and delete them
	return (
		<>
			<h1>Spacecraft Builder</h1>

			<ItemForm onSubmit={addItem} />

			<InventoryDisplay inventory={inventory} onDelete={deleteItem} />
		</>
	);
};

export default SpacecraftBuilder;
