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
        <div className="relative flex items-center justify-center min-h-screen ">
            {/* Spotlight */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-primary/80 to-primary opacity-20 blur-3xl rounded-full" />
            </div>

            {/* Auth Card */}
            <div className="w-full sm:max-w-md bg-card/60 border border-border shadow-xl rounded-lg py-14 sm:px-7 px-3 relative z-10">
                <h2 className="text-3xl font-bold text-center text-text mb-2">
                    {headerText.title}
                </h2>
                <p className="text-center  text-text/70 mb-6">
                    {headerText.subTitle}
                </p>
                {children}
            </div>
        </div>
    );
}
