import { MdError, MdCheckCircle, MdInfo, MdWarning } from "react-icons/md";

interface AlertProps {
    children: React.ReactNode;
    status?: "success" | "error" | "info" | "warning";
}

const alertStyles = {
    success: {
        bg: "bg-green-800/5 border-green-500/80 text-green-100",
        icon: <MdCheckCircle className="text-green-500 shrink-0 text-xl" />,
    },
    error: {
        bg: "bg-red-800/5 border-red-500/80 text-red-100",
        icon: <MdError className="text-red-500 shrink-0 text-xl" />,
    },
    info: {
        bg: "bg-blue-800/5 border-blue-500/80 text-blue-100",
        icon: <MdInfo className="text-blue-500 shrink-0 text-xl" />,
    },
    warning: {
        bg: "bg-yellow-800/5 border-yellow-500/80 text-yellow-100",
        icon: <MdWarning className="text-yellow-500 shrink-0 text-xl" />,
    },
};

export default function Alert({ children, status = "info" }: AlertProps) {
    const { bg, icon } = alertStyles[status];

    return (
        <div
            role="alert"
            className={`flex items-center gap-3 p-3 rounded-lg border animate-in fade-in slide-in-from-top-2 justify-start ${bg}`}
        >
            {icon}
            <p className="text-sm font-medium leading-5">{children}</p>
        </div>
    );
}
