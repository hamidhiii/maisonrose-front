import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: string;
        image: string;
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-sm"
        >
            <div className="size-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-medium text-gray-800 mb-1">{item.name}</h3>
                <p className="text-primary font-bold text-lg">{item.price}</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-4">
                    <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="size-10 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                >
                    <span className="material-symbols-outlined text-2xl">delete</span>
                </button>
            </div>
        </motion.div>
    );
};

export default CartItem;
