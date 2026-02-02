import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Newsletter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-light mb-4">
                        {t('common.newsletter.title')}
                    </h2>
                    <p className="text-white/80 mb-10 text-lg">
                        {t('common.newsletter.subtitle')}
                    </p>
                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder={t('common.newsletter.placeholder')}
                            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-primary font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                        >
                            {t('common.newsletter.button')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
