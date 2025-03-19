"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

type themeT = "light" | "dark"

interface ThemeContextType {
    theme: themeT;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<themeT>("light");

    const value = useMemo(
        () => ({
            theme,
            toggleTheme: () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")),
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
