import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentMethodSelector: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold mb-6">{t('checkout.paymentMethod')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center justify-center p-4 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-primary transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="payment" value="payme" className="sr-only" defaultChecked />
                    <span className="font-bold text-gray-800">Payme</span>
                </label>
                <label className="relative flex items-center justify-center p-4 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-primary transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="payment" value="click" className="sr-only" />
                    <span className="font-bold text-gray-800">Click</span>
                </label>
            </div>
        </div>
    );
};

export default PaymentMethodSelector;
