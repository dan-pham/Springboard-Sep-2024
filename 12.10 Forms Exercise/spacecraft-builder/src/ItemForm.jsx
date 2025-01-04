import { useState } from "react";

import "./ItemForm.css";

const ItemForm = ({ onSubmit }) => {
	// Initialize item
	const INITIAL_ITEM = {
		name: "",
		quantity: "",
		purpose: "",
		agreeToTerms: false,
	};

	// Track item changes
	const [item, setItem] = useState(INITIAL_ITEM);

	// Track errors
	const [errors, setErrors] = useState({});

	// Handle input changes
	const handleInputChange = (event) => {
		const { name, value, type, checked } = event.target;

		setItem((prevItem) => ({
			...prevItem,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Form validation
	const validateForm = () => {
		const newErrors = {};

		if (!item.name) {
			newErrors.name = true;
		}
		if (!item.quantity) {
			newErrors.quantity = true;
		}
		if (!item.purpose) {
			newErrors.purpose = true;
		}
		if (!item.agreeToTerms) {
			newErrors.agreeToTerms = true;
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	// Handle form validation and submission
	const handleSubmit = (event) => {
		event.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid) {
			const newItem = {
				...item,
				id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
			};

			onSubmit(newItem);
			setItem(INITIAL_ITEM);
			setErrors({});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h2>Add an Item to the Inventory</h2>

			<div className={`textfield ${errors["name"] ? "error" : ""}`}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={item.name}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`textfield ${errors["quantity"] ? "error" : ""}`}>
				<input
					type="number"
					name="quantity"
					placeholder="Quantity"
					value={item.quantity}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`textarea ${errors["purpose"] ? "error" : ""}`}>
				<textarea
					name="purpose"
					placeholder="Purpose"
					value={item.purpose}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`checkbox ${errors["agreeToTerms"] ? "error" : ""}`}>
				<input
					type="checkbox"
					id="agreeToTerms"
					name="agreeToTerms"
					checked={item.agreeToTerms}
					onChange={handleInputChange}
				/>
				<label htmlFor="agreeToTerms">Agree to terms</label>
			</div>

			<button type="submit" className="submit-button">
				Add item
			</button>
		</form>
	);
};

export default ItemForm;
