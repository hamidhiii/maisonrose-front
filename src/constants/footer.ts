import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export const FOOTER_DATA = {
    customerService: {
        title: 'CUSTOMER SERVICE',
        links: [
            { text: 'Contact Us', href: '#' },
            { text: 'Shipping & Returns', href: '#' },
            { text: 'FAQ', href: '#' },
            { text: 'Size Guide', href: '#' },
            { text: 'Track Order', href: '#' },
        ],
    },
    myAccount: {
        title: 'MY ACCOUNT',
        links: [
            { text: 'Login / Register', href: '#' },
            { text: 'Order History', href: '#' },
            { text: 'Wishlist', href: '#' },
            { text: 'Newsletter', href: '#' },
        ],
    },
    company: {
        title: 'COMPANY',
        links: [
            { text: 'About Us', href: '#' },
            { text: 'Sustainability', href: '#' },
            { text: 'Careers', href: '#' },
            { text: 'Terms & Conditions', href: '#' },
            { text: 'Privacy Policy', href: '#' },
        ],
    },
    newsletter: {
        title: 'SUBSCRIBE TO OUR NEWSLETTER',
        description: 'Be the first to know about new collections and exclusive offers.',
    },
    social: {
        title: 'FOLLOW US',
        handle: '@maisonrose',
        hashtag: '#MaisonRoseLuxury',
        platforms: [
            { label: 'Instagram', href: '#', icon: Instagram },
            { label: 'Facebook', href: '#', icon: Facebook },
            { label: 'Twitter', href: '#', icon: Twitter },
            { label: 'Youtube', href: '#', icon: Youtube },
        ],
    },
    contact: {
        email: 'hello@maisonrose.com',
        phone: '+1 (555) 123-4567',
        hours: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
    },
    legal: {
        companyName: 'MAISON ROSE',
        copyright: '2023',
        rating: 'Rated 4.9/5 by 10,000+ happy customers',
        links: [
            { text: 'Privacy Policy', href: '#' },
            { text: 'Terms of Service', href: '#' },
            { text: 'Cookie Policy', href: '#' },
            { text: 'Accessibility', href: '#' },
        ],
    },
};
