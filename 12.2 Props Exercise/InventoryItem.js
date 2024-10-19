function InventoryItem({ name, type, quantity = 0, price = 0.0 }) {
	const lowQuantityThreshold = 5;
	const isLowStock = quantity < lowQuantityThreshold;
	const lowStockMessage = `🚨 Low stock: ${quantity} remaining in inventory`;

	const highValueThreshold = 1000;
	const totalValue = quantity * price;
	const isHighValue = totalValue > highValueThreshold;
	const highValueMessage = `💎 High value: $${totalValue} - Take extra precautions!`;

	return (
		<div>
			<h2>
				{name} ({type})
			</h2>
			{isLowStock && (
				<Message>
					<p>{lowStockMessage}</p>
				</Message>
			)}
			{isHighValue && (
				<Message>
					<p>{highValueMessage}</p>
				</Message>
			)}
		</div>
	);
}
