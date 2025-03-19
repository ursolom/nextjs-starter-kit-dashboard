"use client";
import { motion } from "framer-motion";
import { SITE } from "@/constants";

const Logo = () => {
    const letterVariants = {
        rest: {
            y: 0,
            rotate: 0,
            scale: 1
        },
        hover: {
            y: -5,
            rotate: -5,
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const logoVariants = {
        rest: {
            scale: 1,
            rotate: 0
        },
        hover: {
            scale: 1.1,
            rotate: 15,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="flex items-center gap-3 cursor-pointer"
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            <motion.div
                variants={logoVariants}
                className="relative h-8 w-8"
            >
                <svg
                    className="h-full w-full text-emerald-400"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                >
                    <path d="M16 0L0 16l16 16 16-16L16 0zm0 4.8L27.2 16 16 27.2 4.8 16 16 4.8zM8 16l8 8 8-8-8-8-8 8z" />
                </svg>
            </motion.div>

            <motion.span
                className="hidden sm:block text-xl font-bold"
                variants={{
                    rest: { transition: { staggerChildren: 0.03, delayChildren: 0 } },
                    hover: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {SITE.NAME.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        className="inline-block bg-gradient-to-r from-primary/50 to-primary/90 bg-clip-text text-transparent"
                        variants={letterVariants}
                        style={{ display: 'inline-block' }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </motion.div>
    );
};

export default Logo;    