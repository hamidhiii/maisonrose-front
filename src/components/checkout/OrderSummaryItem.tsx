import React from 'react';

interface OrderSummaryItemProps {
    name: string;
    quantity: number;
    price: string;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ name, quantity, price }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{name} x {quantity}</span>
            <span className="font-medium">{price}</span>
        </div>
    );
};

export default OrderSummaryItem;
