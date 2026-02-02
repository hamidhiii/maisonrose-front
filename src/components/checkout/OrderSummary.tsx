import React from 'react';
import { useTranslation } from 'react-i18next';
import OrderSummaryItem from './OrderSummaryItem';

interface OrderSummaryProps {
    cart: Array<{
        id: number;
        name: string;
        price: string;
        quantity: number;
    }>;
    subtotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, subtotal }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold mb-6">{t('checkout.orderSummary')}</h2>
            <div className="space-y-4 mb-8">
                {cart.map(item => (
                    <OrderSummaryItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                    />
                ))}
            </div>
            <div className="pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>{t('checkout.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>{t('checkout.shipping')}</span>
                    <span className="text-green-600 font-medium">{t('checkout.free')}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4">
                    <span>{t('checkout.total')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
