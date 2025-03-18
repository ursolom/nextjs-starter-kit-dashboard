"use client";

import { registerAction } from "@/actions/auth";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ValidationErrors } from "@/types";
import { useActionState } from "react";

export type TState = {
    message?: string;
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
    const [state, action, loading] = useActionState(registerAction, initialState);
    const { error, formData } = state;

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 overflow-hidden">
            {/* Spotlight */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-cyan-600 to-cyan-400 opacity-20 blur-3xl rounded-full"></div>
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
                    <Button loading={loading}>
                        Register Now
                    </Button>
                </form>
            </div>
        </div>
    );
}
