"use client";
import { motion } from "framer-motion";
import { SITE, PAGES } from "@/constants";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { TbBrandNextjs } from "react-icons/tb";

export default function Home() {
  const spotlight = `radial-gradient(
    800px at 0px 0px,
    rgba(113, 113, 122, 0.22),
    transparent 90%
  )`;

  return (
    <div className="min-h-screen">
      {/* Spotlight Effect */}
      <motion.div
        className="absolute top-0 inset-0 pointer-events-none"
        style={{ background: spotlight }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20 text-center relative z-10">
        {/* Logo */}
        <div className="flex relative justify-center mb-6 md:mb-8">
          <div className="p-4 md:p-6 rounded-xl group bg-card/50 relative overflow-hidden flex items-center justify-center">
            <span className="absolute size-full bg-primary opacity-50 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 -z-10 blur-3xl top-12" />
            <motion.svg
              className="size-24 text-primary"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M16 0L0 16l16 16 16-16L16 0zm0 4.8L27.2 16 16 27.2 4.8 16 16 4.8zM8 16l8 8 8-8-8-8-8 8z"
                stroke="currentColor"
                strokeWidth={1}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="100"
                strokeDashoffset="100"
                animate={{
                  strokeDashoffset: [100, 0, 0, 100, 100],
                }}
                transition={{
                  duration: 5,
                  times: [0, 0.2, 0.7, 0.9, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.1,
                }}
              />
            </motion.svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-text uppercase">
          <span className=" bg-gradient-to-r from-text/20 via-text to-text/20 bg-clip-text text-transparent">
            {SITE.NAME} Next.js
          </span>
          <span className="block text-lg md:text-xl lg:text-2xl font-normal text-text/70 mt-4 md:mt-6 lg:mt-8">
            Authentication & Admin Dashboard
          </span>
        </h1>

        <p className="text-base md:text-lg text-text/70 max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          {SITE.DESCRIPTION}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 md:mb-16 px-4">
          <Link
            href={PAGES.PUBLIC.AUTH.LOGIN}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-primary/90 bg-primary/50 text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors text-sm md:text-base"
          >
            <span>Get Started</span>
            <FaArrowRight className="text-lg" />
          </Link>

          <motion.a
            href={SITE.REPO}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-text rounded-lg hover:bg-accent transition-colors text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
          >
            <FaGithub className="text-lg" />
            <span>View Source</span>
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap  justify-center gap-4 md:gap-6 px-4">
          {Object.entries(SITE.SOCIALS).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground md:w-fit w-full flex justify-center items-center hover:text-text p-2 translation rounded-md hover:bg-card/90 border border-border/70 hover:border-border/90 bg-card/20 transition-colors"
            >
              {platform === "GITHUB" && <FaGithub className="text-2xl md:text-3xl" />}
              {platform === "LINKEDIN" && <FaLinkedin className="text-2xl md:text-3xl" />}
              {platform === "FACEBOOK" && <FaFacebook className="text-2xl md:text-3xl" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}