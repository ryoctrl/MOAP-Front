export const generateTransactionMessage = (orderData) => {
    const { OrderItems, id, total_price: price } = orderData;
    const items = OrderItems.map(item => ({menuId: item.menu_id, amount: item.amount, price: item.price}));
    const message = JSON.stringify({
        orderId: id,
        totalPrice: price,
        items,
    });
    return message;
}
