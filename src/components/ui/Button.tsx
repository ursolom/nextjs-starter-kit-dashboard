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
            className={`w-full flex items-center justify-center gap-2  cursor-pointer hover:bg-primary text-white font-semibold py-2 px-4 rounded-md transition-all bg-card/90 border border-border disabled:opacity-50 disabled:cursor-not-allowed ${props.className || ""}`}
            style={{ minHeight: "40px", minWidth: "140px" }}
        >
            {loading ? <Loading /> : children}
        </button>
    );
}
