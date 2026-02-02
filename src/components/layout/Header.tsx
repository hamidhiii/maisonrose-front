import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlist.length;

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f3e7ea] dark:border-[#3a2026] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 py-4 lg:px-20 transition-colors">
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Maison Rose</h1>
                </Link>
            </div>
            <nav className="hidden md:flex flex-1 justify-center gap-8">
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/shop">{t('common.shop')}</Link>
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/about">{t('common.about')}</Link>
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/contact">{t('common.contact')}</Link>
            </nav>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 mr-4 border-r border-[#f3e7ea] pr-4">
                    {['en', 'ru', 'uz'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => changeLanguage(lang)}
                            className={`text-xs font-bold uppercase p-1 rounded transition-colors ${i18n.language === lang ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
                <button className="flex items-center justify-center size-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary/10 text-current transition-colors">
                    <span className="material-symbols-outlined">search</span>
                </button>
                <Link to="/wishlist" className="flex items-center justify-center size-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary/10 text-current transition-colors relative">
                    <span className="material-symbols-outlined">favorite</span>
                    {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background-light dark:ring-background-dark animate-in zoom-in duration-300">
                            {wishlistCount}
                        </span>
                    )}
                </Link>
                <Link to="/cart" className="flex items-center justify-center size-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary/10 text-current transition-colors relative">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background-light dark:ring-background-dark animate-in zoom-in duration-300">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
