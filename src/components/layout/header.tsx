"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PAGES, SITE } from "@/constants";
import Logo from "../Logo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const mainLinks = [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "History", href: "#" },
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
        <header className="bg-card/50 shadow-lg fixed w-full top-0 left-0 z-50 border-b border-border backdrop-blur-2xl">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo with Site Name */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                >
                    <Logo/>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-text hover:text-primary transition-colors duration-200 text-sm font-medium"
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
                                    className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
                                        hover:bg-card bg-card/50 border border-border text-text/90  hover:text-text">
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
                        className="p-2 rounded-lg hover:bg-card border border-border text-text transition-colors cursor-pointer"
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
                            className="fixed md:hidden inset-0 top-16 bg-background backdrop-blur-sm"
                        >
                            <div className="flex flex-col gap-2 p-4 bg-background">
                                {mainLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="px-4 py-3 rounded-lg hover:bg-card text-text text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="border-t border-card pt-4 space-y-3">
                                    {authLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium ${link.name === "Login"
                                                ? "bg-card text-text hover:bg-primary"
                                                : "bg-primary/50 text-white hover:bg-primary"
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