import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const Wishlist: React.FC = () => {
    const { t } = useTranslation();
    const { wishlist, removeFromWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto px-6"
                >
                    <div className="mb-6">
                        <span className="material-symbols-outlined text-gray-300 text-8xl">favorite_border</span>
                    </div>
                    <h2 className="text-3xl font-light text-gray-800 mb-4">
                        {t('wishlist.empty') || 'Your Wishlist is Empty'}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {t('wishlist.emptyDescription') || 'Start adding products you love to your wishlist'}
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all"
                    >
                        {t('wishlist.continueShopping') || 'Continue Shopping'}
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="px-6 md:px-12 lg:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
                        {t('wishlist.title') || 'My Wishlist'}
                    </h1>
                    <p className="text-gray-600">
                        {wishlist.length} {wishlist.length === 1 ? (t('wishlist.item') || 'item') : (t('wishlist.items') || 'items')}
                    </p>
                </motion.div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <Link to={`/product/${item.id}`} className="block">
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </Link>

                            <div className="p-6">
                                <Link to={`/product/${item.id}`}>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2 hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-xl font-bold text-gray-900 mb-4">{item.price}</p>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-all text-sm font-medium"
                                    >
                                        {t('wishlist.viewProduct') || 'View'}
                                    </Link>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="p-2 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                                        aria-label="Remove from wishlist"
                                    >
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Continue Shopping */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <Link
                        to="/shop"
                        className="inline-block text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                        ← {t('wishlist.continueShopping') || 'Continue Shopping'}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Wishlist;
