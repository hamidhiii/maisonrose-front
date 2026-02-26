import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await productService.getProduct(Number(id));
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="py-20 px-6 md:px-12 lg:px-16 bg-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <button onClick={() => navigate('/shop')} className="mt-4 text-primary underline">
                    Back to Shop
                </button>
            </div>
        );
    }

    const formattedProduct = {
        ...product,
        price: `$${product.price}`
    };

    return (
        <div className="py-20 px-6 md:px-12 lg:px-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="aspect-square overflow-hidden rounded-2xl bg-gray-100"
                >
                    <img
                        src={productService.getFullImageUrl(formattedProduct.image, formattedProduct.name, formattedProduct.category_name)}
                        alt={formattedProduct.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col justify-center"
                >
                    <nav className="text-sm text-gray-500 mb-4">
                        <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
                        <span className="mx-2">/</span>
                        <button onClick={() => navigate('/shop')} className="hover:text-primary">{t('common.shop')}</button>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{formattedProduct.name}</span>
                    </nav>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{formattedProduct.name}</h1>
                    <p className="text-3xl font-light text-primary mb-6">{formattedProduct.price}</p>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <p>
                            {formattedProduct.description || `Experience the finest quality with our ${formattedProduct.name}. Hand-crafted with attention to detail and premium materials, this piece is designed to elevate your lifestyle.`}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => addToCart({
                                id: formattedProduct.id,
                                name: formattedProduct.name,
                                price: formattedProduct.price,
                                image: formattedProduct.image,
                            })}
                            className="flex-1 bg-primary text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                        >
                            {t('common.addToCart')}
                        </button>
                    </div>

                    <div className="mt-12 border-t border-gray-100 pt-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Product Details</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Hand-crafted in Uzbekistan</li>
                            <li>• Premium quality materials</li>
                            <li>• Sustainable production</li>
                            <li>• Unique design</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
