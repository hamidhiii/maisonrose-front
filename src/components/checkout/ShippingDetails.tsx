import React from 'react';
import { useTranslation } from 'react-i18next';

const UZ_REGIONS = [
    "Tashkent", "Tashkent Region", "Andijan", "Bukhara", "Fergana", "Jizzakh",
    "Namangan", "Navoi", "Kashkadarya", "Samarkand", "Sirdaryo", "Surkhandarya",
    "Khorezm", "Republic of Karakalpakstan"
];

const ShippingDetails: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.fullName')}</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.phoneNumber')}</label>
                    <input required type="tel" placeholder="+998" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.region')}</label>
                <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option value="">{t('checkout.selectRegion')}</option>
                    {UZ_REGIONS.map(region => <option key={region} value={region}>{region}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.address')}</label>
                <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"></textarea>
            </div>
        </div>
    );
};

export default ShippingDetails;
