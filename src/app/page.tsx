"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SITE, PAGES } from "@/constants";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(
    1300px at ${mouseX}px ${mouseY}px,
    rgba(113, 113, 122, 0.15),
    transparent 90%
  )`;

  const blobPath = "M415,275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z";
  return (
    <div className="min-h-screen">
      {/* Spotlight Effect */}
      <motion.div
        className="absolute  top-0 inset-0 pointer-events-none"
        style={{ background: spotlight }}
      />

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="p-3 rounded-xl hover:border-border hover:bg-card bg-card/80 border/80 border border-border/80 flex items-center justify-center transition-colors"
          >
            <motion.svg className="size-16 text-primary" viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1
                }}
                strokeWidth={4}
                strokeDasharray="0 1"
                d="M16 0L0 16l16 16 16-16L16 0zm0 4.8L27.2 16 16 27.2 4.8 16 16 4.8zM8 16l8 8 8-8-8-8-8 8z"
                fill="currentColor"
              />
            </motion.svg>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {SITE.NAME}
          <span className="block text-xl md:text-2xl font-normal text-text/70 mt-4">
            Authentication & Admin Dashboard
          </span>
        </motion.h1>

        <p
          className="text-lg text-text/70 max-w-2xl mx-auto mb-12"
        >
          {SITE.DESCRIPTION}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <motion.a
            href={PAGES.PUBLIC.AUTH.LOGIN}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span>Get Started</span>
            <FaArrowRight className="text-lg" />
          </motion.a>

          <motion.a
            href={SITE.REPO}
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-text rounded-lg hover:bg-accent transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <FaGithub className="text-lg" />
            <span>View Source</span>
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {Object.entries(SITE.SOCIALS).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-text p-2 translation rounded-md hover:bg-card/90 border border-border/70 hover:border-border/90  bg-card/20 transition-colors"
            >
              {platform === "GITHUB" && <FaGithub className="text-3xl" />}
              {platform === "LINKEDIN" && <FaLinkedin className="text-3xl" />}
              {platform === "FACEBOOK" && <FaFacebook className="text-3xl" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}