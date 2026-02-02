import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, ChevronUp } from 'lucide-react';
import { FOOTER_DATA } from '../../constants/footer';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const linkHover = {
    rest: { x: 0 },
    hover: { x: 4 },
};

const iconHover = {
    rest: { scale: 1 },
    hover: { scale: 1.15, rotate: 5 },
};

// Components
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <motion.a
        href={href}
        className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm block py-1.5"
        variants={linkHover}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.a>
);

const FooterSection: React.FC<{ title: string; children: React.ReactNode; delay?: number }> = ({
    title,
    children,
    delay = 0,
}) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1, duration: 0.6 }}
        variants={fadeInUp}
    >
        <h3 className="text-gray-900 font-bold text-sm mb-6 tracking-widest uppercase">{title}</h3>
        {children}
    </motion.div>
);

const SocialLinks: React.FC = () => {
    return (
        <div className="flex gap-5 mb-6">
            {FOOTER_DATA.social.platforms.map((platform) => (
                <motion.a
                    key={platform.label}
                    href={platform.href}
                    aria-label={platform.label}
                    className="text-gray-700 hover:text-primary transition-colors duration-300"
                    initial="rest"
                    whileHover="hover"
                >
                    <motion.div
                        variants={iconHover}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <platform.icon size={24} />
                    </motion.div>
                </motion.a>
            ))}
        </div>
    );
};

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setEmail('');
            }, 1000);
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            variants={fadeInUp}
            className="mb-12"
        >
            <h3 className="text-gray-900 font-bold text-sm mb-4 tracking-widest uppercase">
                {FOOTER_DATA.newsletter.title}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
                {FOOTER_DATA.newsletter.description}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
                <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 border border-gray-300 focus:border-primary focus:outline-none transition-all duration-300 text-sm bg-white"
                    animate={{
                        borderColor: isFocused ? '#ef3966' : '#d1d5db',
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="bg-gray-900 text-white px-10 py-4 hover:bg-primary transition-all duration-300 font-bold text-sm uppercase tracking-widest disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    {isSubmitting ? '...' : 'Sign Up'}
                </motion.button>
            </form>
        </motion.div>
    );
};

const ContactInfo: React.FC = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <motion.div
            className="space-y-6 pt-8 border-t border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            variants={fadeInUp}
        >
            <h3 className="text-gray-900 font-bold text-sm mb-6 tracking-widest uppercase">CONTACT US</h3>

            <motion.a
                href={`mailto:${FOOTER_DATA.contact.email}`}
                className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors duration-300"
                onMouseEnter={() => setHoveredItem('email')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <motion.div
                    animate={{ scale: hoveredItem === 'email' ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Mail size={20} />
                </motion.div>
                <span className="text-base">{FOOTER_DATA.contact.email}</span>
            </motion.a>

            <div className="flex items-start gap-4 text-gray-600">
                <Phone size={20} className="mt-1" />
                <div className="text-base">
                    <div className="font-bold text-gray-900">{FOOTER_DATA.contact.phone}</div>
                    <div className="text-sm text-gray-500 mt-1">{FOOTER_DATA.contact.hours}</div>
                </div>
            </div>

            <motion.a
                href="#chat"
                className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors duration-300"
                onMouseEnter={() => setHoveredItem('chat')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <motion.div
                    animate={{ scale: hoveredItem === 'chat' ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <MessageCircle size={20} />
                </motion.div>
                <span className="text-base">Live Chat Assistance</span>
            </motion.a>
        </motion.div>
    );
};

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 bg-gray-900 text-white p-4 rounded-full shadow-2xl z-50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: '#ef3966' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={28} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

// Main Footer Component
const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer Content */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24">
                    {/* Customer Service */}
                    <div className="lg:col-span-2">
                        <FooterSection title={FOOTER_DATA.customerService.title} delay={0}>
                            <nav className="space-y-1">
                                {FOOTER_DATA.customerService.links.map((link) => (
                                    <FooterLink key={link.text} href={link.href}>
                                        {link.text}
                                    </FooterLink>
                                ))}
                            </nav>
                        </FooterSection>
                    </div>

                    {/* My Account */}
                    <div className="lg:col-span-2">
                        <FooterSection title={FOOTER_DATA.myAccount.title} delay={1}>
                            <nav className="space-y-1">
                                {FOOTER_DATA.myAccount.links.map((link) => (
                                    <FooterLink key={link.text} href={link.href}>
                                        {link.text}
                                    </FooterLink>
                                ))}
                            </nav>
                        </FooterSection>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <FooterSection title={FOOTER_DATA.company.title} delay={2}>
                            <nav className="space-y-1">
                                {FOOTER_DATA.company.links.map((link) => (
                                    <FooterLink key={link.text} href={link.href}>
                                        {link.text}
                                    </FooterLink>
                                ))}
                            </nav>
                        </FooterSection>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="lg:col-span-6 space-y-12">
                        <Newsletter />

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            variants={fadeInUp}
                        >
                            <FooterSection title={FOOTER_DATA.social.title} delay={3}>
                                <SocialLinks />
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Share your style with{' '}
                                    <span className="font-bold text-gray-900">{FOOTER_DATA.social.handle}</span>
                                    <br />
                                    <span className="font-bold text-primary">{FOOTER_DATA.social.hashtag}</span>
                                </p>
                            </FooterSection>
                        </motion.div>

                        <ContactInfo />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100 bg-gray-50/50">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12">
                    <motion.div
                        className="text-center space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-black tracking-[0.4em] text-gray-900"
                            initial={{ opacity: 0, letterSpacing: '0.1em' }}
                            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {FOOTER_DATA.legal.companyName}
                        </motion.h2>
                        <p className="text-gray-600 text-sm">
                            Copyright © {FOOTER_DATA.legal.copyright} By {FOOTER_DATA.legal.companyName}.
                        </p>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">{FOOTER_DATA.legal.rating}</p>

                        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-6">
                            {FOOTER_DATA.legal.links.map((link, index) => (
                                <React.Fragment key={link.text}>
                                    <motion.a
                                        href={link.href}
                                        className="text-gray-600 hover:text-primary text-sm font-medium transition-colors duration-300"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        {link.text}
                                    </motion.a>
                                    {index < FOOTER_DATA.legal.links.length - 1 && (
                                        <span className="text-gray-200">|</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </div>

            <ScrollToTop />
        </footer>
    );
};

export default Footer;
