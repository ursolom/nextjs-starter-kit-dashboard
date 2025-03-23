import { ButtonHTMLAttributes } from "react";
import { Loading } from "./Loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
}

export default function Button({ children, loading = false, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`size-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer 
                        hover:bg-card text-white font-semibold py-2 px-4 rounded-lg 
                        transition-all bg-card/50 border border-border 
                        disabled:opacity-50 disabled:cursor-not-allowed 
                        ${props.className || ""}`}
        >
            {loading ? <Loading /> : children}
        </button>
    );
}
