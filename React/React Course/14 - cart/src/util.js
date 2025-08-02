export const getTotals = (cart) => {
	let totalAmount = 0,
		totalCost = 0;
	cart.values().forEach((element) => {
		totalAmount += element.amount;
		totalCost += element.amount * element.price;
	});

	return { totalAmount, totalCost };
};
