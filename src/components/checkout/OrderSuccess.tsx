import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const OrderSuccess: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-2xl"
            >
                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{t('checkout.orderConfirmed')}</h2>
                <p className="text-gray-600 mb-8">{t('checkout.thankYou')}</p>
                <p className="text-sm text-gray-400">{t('checkout.redirecting')}</p>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
