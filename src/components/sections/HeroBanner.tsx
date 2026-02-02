import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroBanner: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-[#1b0d11]">
            <div className="absolute inset-0 opacity-60">
                <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2070&auto=format&fit=crop"
                    alt="Hero Background"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
                >
                    {t('home.hero.title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 max-w-2xl text-lg text-white/90 md:text-xl"
                >
                    {t('home.hero.subtitle')}
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="rounded-full bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
                >
                    {t('home.hero.cta')}
                </motion.button>
            </div>
        </section>
    );
};

export default HeroBanner;
