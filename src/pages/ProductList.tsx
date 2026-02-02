import React from 'react';
import { useTranslation } from 'react-i18next';
import { featuredProducts } from '../constants/homeData';
import ProductCard from '../components/ui/ProductCard';

const ProductList: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 px-6 md:px-12 lg:px-16 bg-white">
            <div className="mb-12">
                <h1 className="text-4xl font-light text-gray-800 mb-4">{t('common.shop')}</h1>
                <p className="text-gray-600">{t('home.bestSellers.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
