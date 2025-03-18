"use client";

import { registerAction } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { useActionState } from "react";
export type TState = {
    message?: string | undefined;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
    redirectTo?: string;
};

const initialState: TState = {
    message: "",
    error: {},
    status: null,
    formData: null,
};
export default function RegisterPage() {
    const { state, action } = useActionState(registerAction);
    const { error, formData } = state;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-black shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    إنشاء حساب جديد
                </h2>

                <form action={action} className="flex flex-col gap-4">
                    <Input
                        label="الاسم الكامل"
                        name="name"
                        placeholder="أدخل اسمك"
                        error={error}
                        defaultValue={formData?.name}
                    />

                    <Input
                        label="البريد الإلكتروني"
                        name="email"
                        placeholder="example@email.com"
                        type="email"
                        error={error}
                        defaultValue={formData?.email}
                    />

                    <Input
                        label="كلمة المرور"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        error={error}
                        defaultValue={formData?.password}
                    />

                    {error?.general && (
                        <p className="text-red-600 text-sm font-medium">{error.general}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
                    >
                        تسجيل حساب
                    </button>
                </form>
            </div>
        </div>
    );
}
