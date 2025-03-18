"use client";

type Props = {
    headerText: {
        title: string;
        subTitle: string;
    };
    children: React.ReactNode;
};

export default function FormContainer({ headerText, children }: Props) {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 overflow-hidden">
            {/* Spotlight */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-primary/50 to-primary opacity-20 blur-3xl rounded-full" />
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-md bg-white dark:bg-neutral-800/40 shadow-xl rounded-lg p-8 relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    {headerText.title}
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    {headerText.subTitle}
                </p>
                {children}
            </div>
        </div>
    );
}