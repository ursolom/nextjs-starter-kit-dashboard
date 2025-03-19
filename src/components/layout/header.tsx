"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PAGES, SITE } from "@/constants";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const mainLinks = [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "History", href: "#" },
        { name: "Services", href: "#" },
        { name: "Projects", href: "#" },
        { name: "Blog", href: "#" },
    ];

    const authLinks = [
        { name: "Login", href: PAGES.PUBLIC.AUTH.LOGIN },
        { name: "Register", href: PAGES.PUBLIC.AUTH.REGISTER },
    ];

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <header className="bg-neutral-900 shadow-lg fixed w-full top-0 left-0 z-50 border-b border-neutral-800">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo with Site Name */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                >
                    <svg
                        className="h-8 w-8 text-emerald-400 transition-transform group-hover:rotate-12"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                    >
                        <path d="M16 0L0 16l16 16 16-16L16 0zm0 4.8L27.2 16 16 27.2 4.8 16 16 4.8zM8 16l8 8 8-8-8-8-8 8z" />
                    </svg>
                    <span className="hidden sm:block text-xl font-bold text-neutral-100">
                        {SITE.NAME}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-neutral-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-3">
                            {authLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${link.name === "Login"
                                        ? "bg-neutral-800 text-neutral-100 hover:bg-emerald-500 hover:text-white"
                                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-200 transition-colors"
                    >
                        {isOpen ? (
                            <FiX className="w-6 h-6" />
                        ) : (
                            <FiMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu with Animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={mobileMenuVariants}
                            transition={{ duration: 0.3 }}
                            className="fixed md:hidden inset-0 top-16 bg-neutral-900/95 backdrop-blur-sm"
                        >
                            <div className="flex flex-col gap-2 p-4">
                                {mainLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="px-4 py-3 rounded-lg hover:bg-neutral-800 text-neutral-200 text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="border-t border-neutral-800 pt-4 space-y-3">
                                    {authLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium ${link.name === "Login"
                                                ? "bg-neutral-800 text-neutral-100 hover:bg-emerald-500"
                                                : "bg-emerald-500 text-white hover:bg-emerald-600"
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}