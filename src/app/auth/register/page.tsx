"use client";

import { registerAction } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { ValidationErrors } from "@/types";
import { useActionState } from "react";

export type TState = {
    message?: string | undefined;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
};

const initialState: TState = {
    message: "",
    error: {},
    status: null,
    formData: null,
};

export default function RegisterPage() {
    const [state, action] = useActionState(registerAction, initialState);
    const { error, formData } = state;

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 overflow-hidden">
            {/* spotlight */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-teal-600 to-teal-400 opacity-20 blur-3xl rounded-full"></div>
            </div>

            {/* Register Card */}
            <div className="w-full max-w-md bg-white dark:bg-neutral-800/40 shadow-xl rounded-lg p-8 relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Create an Account
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    Enter your details below to create your account.
                </p>

                <form action={action} className="flex flex-col gap-4">
                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="Enter your name"
                        error={error}
                        defaultValue={formData?.get("name") as string}
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        placeholder="example@email.com"
                        type="email"
                        error={error}
                        defaultValue={formData?.get("email") as string}
                    />

                    <Input
                        label="Password"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        error={error}
                        defaultValue={formData?.get("password") as string}
                    />

                    {error?.general && (
                        <p className="text-red-600 text-sm font-medium">{error.general}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
