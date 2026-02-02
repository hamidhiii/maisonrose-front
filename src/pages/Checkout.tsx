import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import OrderSuccess from '../components/checkout/OrderSuccess';

const Checkout: React.FC = () => {
    const { t } = useTranslation();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const subtotal = cart.reduce((acc, item) => {
        const priceStr = typeof item.price === 'string' ? item.price : String(item.price);
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            clearCart();
            navigate('/');
        }, 3000);
    };

    if (isSubmitted) {
        return <OrderSuccess />;
    }

    return (
        <div className="py-20 px-6 md:px-12 lg:px-16 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-sm"
                >
                    <h2 className="text-2xl font-bold mb-8">{t('checkout.shippingInfo')}</h2>
                    <CheckoutForm onSubmit={handleSubmit} />
                </motion.div>

                <div className="lg:sticky lg:top-32 h-fit">
                    <OrderSummary cart={cart} subtotal={subtotal} />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
