import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';

const Cart: React.FC = () => {
    const { t } = useTranslation();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => {
        const priceStr = typeof item.price === 'string' ? item.price : String(item.price);
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    return (
        <div className="py-20 px-6 md:px-12 lg:px-16 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-light text-gray-800 mb-12">{t('common.cart')}</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                        <p className="text-xl text-gray-500 mb-8">Your cart is empty</p>
                        <Link
                            to="/shop"
                            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                        >
                            {t('common.shop')}
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </AnimatePresence>

                        <div className="mt-12 p-8 bg-white rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
                            <button
                                onClick={clearCart}
                                className="text-gray-400 hover:text-gray-800 transition-colors underline text-sm uppercase tracking-widest font-bold"
                            >
                                Clear Cart
                            </button>
                            <div className="text-center md:text-right">
                                <p className="text-gray-500 mb-1">Subtotal</p>
                                <p className="text-4xl font-bold text-gray-900 mb-8">${subtotal.toFixed(2)}</p>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="bg-primary text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/20"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
