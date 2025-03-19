export const SITE = {
    NAME: "Starter Kit",
    LOGO: "/logo.svg",
    DESCRIPTION: "This is an amazing website Starter Kit built with Next.js",
    BASE_URL: "https://starter-kit-nextjs-ursolom.vercel.app",
    SUPPORT_EMAIL: "ursolom.dev@email.com",
    SOCIALS: {
        FACEBOOK: "https://facebook.com/ursolom",
        TWITTER: "https://twitter.com/ursolom",
        INSTAGRAM: "https://instagram.com/ursolom",
    },
};

export const PAGE_TITLES = {
    HOME: `${SITE.NAME} - Home`,
    ABOUT: `${SITE.NAME} - About Us`,
    CONTACT: `${SITE.NAME} - Contact`,
    LOGIN: `${SITE.NAME} - Login`,
    REGISTER: `${SITE.NAME} - Register`,
    DASHBOARD: `${SITE.NAME} - Dashboard`,
};

export const PAGES = {
    PUBLIC: {
        AUTH: {
            LOGIN: "/auth/login",
            REGISTER: "/auth/register",
        },
    },
    ADMIN: {
        LOGIN: "/admin/login",
    },
};
