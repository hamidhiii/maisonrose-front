import React from 'react';
import { useTranslation } from 'react-i18next';
import ShippingDetails from './ShippingDetails';
import PaymentMethodSelector from './PaymentMethodSelector';

interface CheckoutFormProps {
    onSubmit: (e: React.FormEvent) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <ShippingDetails />
            <PaymentMethodSelector />

            <button
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/20 mt-8"
            >
                {t('checkout.placeOrder')}
            </button>
        </form>
    );
};

export default CheckoutForm;

