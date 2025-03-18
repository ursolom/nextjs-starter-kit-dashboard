const config = {
    env: {
        databaseUrl: process.env.DATABASE_URL,
        dev: process.env.NODE_ENV === "development",
        prod: process.env.NODE_ENV === "production",
        // secretKey: process.env.NEXTAUTH_SECRET,
    },
};

export default config;
