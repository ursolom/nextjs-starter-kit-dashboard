export const SITE = {
    NAME: "Starter Kit",
    LOGO: "/logo.svg",
    DESCRIPTION: "This is an amazing website Starter Kit built with Next.js",
    BASE_URL: "https://starter-kit-nextjs-ursolom.vercel.app",
    SUPPORT_EMAIL: "ursolom.dev@email.com",
    SOCIALS: {
        FACEBOOK: "https://facebook.com/ursolom",
        GITHUB: "https://github.com/ursolom",
        LINKEDIN: "https://linkedin.com/in/ursolom",
    },
    REPO: "https://github.com/ursolom/nextjs-starter-kit-dashboard"

};
export const LOGGED_OUT_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/login'
];
export const PUBLIC_ROUTES = ['/']

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
    USER: {
        ACCOUNT: "/account",
    },
    ADMIN: {
        DASHBOARD: "/admin",
        LOGIN: "/login",
    },
};

