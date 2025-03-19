"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { themeState } from "@/state/themeAtom";
import Logo from "../Logo";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { PAGES } from "@/constants";

export default function Header() {
    const [theme, setTheme] = useRecoilState(themeState);
    const [isOpen, setIsOpen] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
    };

    const links = [
        { name: "Login", href: PAGES.PUBLIC.AUTH.LOGIN },
        { name: "Register", href: PAGES.PUBLIC.AUTH.REGISTER },
    ];

    return (
        <header className="w-full py-4 bg-white dark:bg-neutral-900 shadow-md fixed top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Logo />

                {/* Desktop Links */}
                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-neutral-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                >
                    {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-neutral-700 dark:text-neutral-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-14 left-0 w-full bg-white dark:bg-neutral-900 shadow-md py-4">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block px-6 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
