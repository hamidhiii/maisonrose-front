import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';
import ProductCard from '../components/ui/ProductCard';

const ProductList: React.FC = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-20 px-6 md:px-12 lg:px-16 bg-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="py-20 px-6 md:px-12 lg:px-16 bg-white">
            <div className="mb-12">
                <h1 className="text-4xl font-light text-gray-800 mb-4">{t('common.shop')}</h1>
                <p className="text-gray-600">{t('home.bestSellers.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={{
                            ...product,
                            price: `$${product.price}` // Adding $ if backend doesn't provide it
                        }}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
