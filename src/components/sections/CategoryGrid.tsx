import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";
import type { Category } from "../../services/productService";

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    imageAlt: string;
    id: number;
    slug: string;
    hoveredId: number | null;
    onHover: (id: number | null) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, imageAlt, id, slug, hoveredId, onHover }) => {
    return (
        <motion.div
            className="group relative overflow-hidden bg-gray-100"
            style={{ aspectRatio: "3/4" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (id % 4) * 0.1, duration: 0.6 }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
        >
            <Link to={`/category/${slug}`} className="block w-full h-full cursor-pointer">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        scale: hoveredId === id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <motion.div
                    className="absolute inset-0 bg-black/20"
                    animate={{
                        opacity: hoveredId === id ? 0.4 : 0.2,
                    }}
                    transition={{ duration: 0.3 }}
                />

                <div className="absolute inset-0 flex items-end p-4">
                    <motion.h3
                        className="text-white text-2xl font-serif tracking-wide"
                        animate={{
                            y: hoveredId === id ? -5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {title}
                    </motion.h3>
                </div>

                <motion.div
                    className="absolute bottom-4 left-4 h-0.5 bg-white"
                    initial={{ width: 0 }}
                    animate={{
                        width: hoveredId === id ? "100px" : "0px",
                    }}
                    transition={{ duration: 0.4 }}
                />
            </Link>
        </motion.div>
    );
};

const CategoryGrid: React.FC = () => {
    const { t } = useTranslation();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await productService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentItems = () => {
        const start = currentPage * itemsPerPage;
        return categories.slice(start, start + itemsPerPage);
    };

    if (loading) return null;

    return (
        <section className="py-20 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-light text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('home.categories.title')}
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Curated collections for your daily ritual.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {getCurrentItems().map((category) => (
                        <CategoryCard
                            key={`${category.id}-${currentPage}`}
                            id={category.id}
                            title={t(`home.categories.${category.slug}`) || category.name}
                            slug={category.slug}
                            imageUrl={productService.getFullImageUrl(category.image ?? null, category.name)}
                            imageAlt={category.name}
                            hoveredId={hoveredId}
                            onHover={setHoveredId}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-10">
                    <button
                        onClick={prevPage}
                        className="w-12 h-12 border-2 border-gray-300 flex hover:cursor-pointer items-center justify-center hover:bg-gray-100 transition-colors"
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
                        className="w-12 h-12 border-2 border-gray-300 flex hover:cursor-pointer items-center justify-center hover:bg-gray-100 transition-colors"
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

export default CategoryGrid;
