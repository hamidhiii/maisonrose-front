import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { productService } from '../../services/productService';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: string;
        image: string | null;
        category_name?: string;
    };
    index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
    const { t } = useTranslation();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative bg-white overflow-hidden cursor-pointer rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <motion.img
                    src={productService.getFullImageUrl(product.image, product.name, product.category_name)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Wishlist Heart Icon (Top Right) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                    }}
                    className={`absolute top-4 right-4 z-10 size-10 rounded-full flex items-center justify-center transition-all duration-300 ${isInWishlist(product.id)
                        ? "bg-primary text-white scale-110 shadow-lg"
                        : "bg-white/80 text-gray-600 hover:bg-white hover:text-primary backdrop-blur-sm"
                        }`}
                >
                    <span className={`material-symbols-outlined text-2xl ${isInWishlist(product.id) ? "fill-1" : ""}`}>
                        favorite
                    </span>
                </button>

                {/* Overlay on hover */}
                <motion.div
                    className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />



                {/* Add to Cart Button (Bottom) */}
                <motion.button
                    className="absolute bottom-0 left-0 right-0 z-10 bg-primary text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                    initial={{ y: "100%" }}
                    animate={{
                        y: isHovered ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                        });
                    }}
                >
                    {t('common.addToCart')}
                </motion.button>
            </div>

            {/* Product Info */}
            <div className="p-6 text-left" onClick={() => navigate(`/product/${product.id}`)}>
                <h3 className="font-medium text-gray-800 text-lg mb-2 tracking-tight">
                    {product.name}
                </h3>
                <p className="text-primary font-bold text-xl">
                    {product.price}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
