import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { featuredProducts } from "../../constants/homeData";
import ProductCard from "../ui/ProductCard";

const ProductSkeleton = () => (
    <div className="overflow-hidden bg-gray-100 rounded-2xl">
        <div className="relative w-full aspect-square bg-gray-200 animate-pulse" />
        <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
    </div>
);

const BestSellers: React.FC = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(featuredProducts.length / itemsPerPage);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentItems = () => {
        const start = currentPage * itemsPerPage;
        return featuredProducts.slice(start, start + itemsPerPage);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-light text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('home.bestSellers.title')}
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {t('home.bestSellers.subtitle')}
                    </motion.p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(itemsPerPage)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {getCurrentItems().map((product, index) => (
                            <ProductCard
                                key={`${product.id}-${currentPage}`}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-10">
                    <button
                        onClick={prevPage}
                        className="w-12 h-12 border-2 border-gray-300 flex items-center hover:cursor-pointer justify-center hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextPage}
                        className="w-12 h-12 border-2 border-gray-300 flex items-center hover:cursor-pointer justify-center hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPage
                                ? "bg-gray-800 w-8"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
