import { ValidationErrors } from "@/types";
import { forwardRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    error?: ValidationErrors;
    defaultValue?: string;
    required?: boolean;
    type?: string;
    icon?: React.ReactNode;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    value?: string;
    readOnly?: boolean;
    dir?: "rtl" | "ltr";
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            name,
            placeholder,
            disabled,
            autoFocus,
            error,
            defaultValue,
            required,
            type = "text",
            icon,
            onKeyDown,
            value,
            readOnly,
            onFocus,
            onBlur,
            onChange,
            dir = "ltr",
            className = "",
            ...props
        },
        ref
    ) => {
        const hasError = error && error[name];
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className={`flex flex-col gap-2 w-full ${className}`} data-toggle-password-group>
                {label && (
                    <label
                        htmlFor={name}
                        className={`text-lg font-semibold ${hasError ? "text-red-400" : "text-black dark:text-white"} ${className}`}
                    >
                        {label} {required && <span className="text-red-400">*</span>}
                    </label>
                )}

                <div className="input-group relative">
                    {icon && (
                        <button
                            type="button"
                            className={`absolute left-2 top-1/2 -translate-y-1/2 p-2
                                ${hasError ? "text-red-500 hover:text-red-600" : "text-black dark:text-white"}
                                ${className}`}
                            onClick={() => {
                                if (typeof ref === "object" && ref?.current) {
                                    ref.current.focus();
                                }
                            }}
                            aria-label="icon aria"
                            tabIndex={-1}
                        >
                            {icon}
                        </button>
                    )}

                    <input
                        type={type === "password" && showPassword ? "text" : type}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        name={name}
                        id={name}
                        ref={ref}
                        defaultValue={defaultValue}
                        required={required}
                        onKeyDown={onKeyDown}
                        readOnly={readOnly}
                        className={`p-2 text-xl sm:text-lg rounded-sm border shadow-sm
                            focus:outline-none focus:ring-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                            bg-white text-black dark:bg-card/50 dark:text-white
                            placeholder:text-neutral-400 dark:placeholder:text-neutral-400
                            transition-all duration-200 w-full
                            ${hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 dark:border-border focus:ring-border focus:border-border"
                            } ${className}
                            ${icon ? "pl-10" : "p-2"}
                            ${type === "password" ? "pr-10" : ""}
                            `}
                        value={value}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={onChange}
                        dir={dir}
                        {...props}
                    />

                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400"
                            tabIndex={-1}
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                        </button>
                    )}
                </div>

                {hasError && (
                    <p className="text-sm md:text-base text-red-500 font-medium mt-1">{error[name][0]}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
