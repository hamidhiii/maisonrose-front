import { apiFetch } from './api';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
    category: string | number;
    category_name?: string;
}

export const productService = {
    getProducts: (categorySlug?: string) => {
        const query = categorySlug ? `?category=${categorySlug}` : '';
        return apiFetch<Product[]>(`/products/${query}`);
    },
    getProduct: (id: number) => {
        return apiFetch<Product>(`/products/${id}/`);
    },
    getCategories: () => {
        return apiFetch<Category[]>(`/categories/`);
    },
    getFullImageUrl: (path: string | null, name?: string, category?: string) => {
        if (!path) {
            // Using a high-quality keyword-based image service (like Unsplash/LoremFlickr)
            // fallback format: https://loremflickr.com/800/800/{keyword1,keyword2}/all
            const keywords = [category, name, 'artisan', 'handmade']
                .filter(Boolean)
                .map(k => k!.toLowerCase().replace(/\s+/g, ','))
                .join(',');

            return `https://loremflickr.com/800/800/${keywords}/all`;
        }
        if (path.startsWith('http')) return path;
        return `${BASE_URL}${path}`;
    }
};
