import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { featuredProducts } from '../constants/homeData';
import ProductCard from '../components/ui/ProductCard';

const CategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [categorySlug]);

    // Filter products by category
    const filteredProducts = featuredProducts.filter(
        product => product.category === categorySlug
    );

    // Get category title from translation
    const getCategoryTitle = () => {
        switch (categorySlug) {
            case 'ceramics':
                return t('home.categories.ceramics');
            case 'textiles':
                return t('home.categories.textiles');
            case 'woodwork':
                return t('home.categories.woodwork');
            case 'jewelry':
                return t('home.categories.jewelry');
            default:
                return 'Category';
        }
    };

    const ProductSkeleton = () => (
        <div className="overflow-hidden bg-gray-100 rounded-2xl">
            <div className="relative w-full aspect-square bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-6 md:px-12 lg:px-16 py-6">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-primary transition-colors">
                            {t('common.home') || 'Home'}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-800 font-medium">{getCategoryTitle()}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <div className="px-6 md:px-12 lg:px-16 py-12 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
                        {getCategoryTitle()}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {filteredProducts.length} {t('common.products') || 'products'} {t('common.available') || 'available'}
                    </p>
                </motion.div>
            </div>

            {/* Products Grid */}
            <div className="px-6 md:px-12 lg:px-16 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-600 text-lg">
                            {t('common.noProducts') || 'No products found in this category'}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
