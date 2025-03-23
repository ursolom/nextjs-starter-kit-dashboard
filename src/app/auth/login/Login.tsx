"use client";

import { loginAction } from "@/actions/auth";
import { TState } from "@/types";
import { useActionState, useEffect } from "react";
import { LoginInputs } from "../inputs";
import Link from "next/link";
import FormContainer from "../FormContainer";
import { PAGES } from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const initialState: TState = {
    message: "",
    error: {},
    status: null,
    formData: null,
};

const headerText = {
    title: "Log in to your account",
    subTitle: "Enter your email and password below to log in"
};

export default function LoginPage() {
    const [state, action, loading] = useActionState(loginAction, initialState);
    const router = useRouter();
    const { error, formData, status, message } = state;

    useEffect(() => {
        if (status && message) {
            if (status === 200 || status === 201) {
                toast.success(message as string);
            }
            toast.error(message as string);
        }
        if (status === 200 || status === 201) {
            router.replace(PAGES.USER.ACCOUNT);
        }
    }, [status, message]);

    return (
        <FormContainer headerText={headerText}>
            <form action={action} className="flex flex-col gap-4">
                {LoginInputs.map(({ label, name, placeholder, type }) => (
                    <Input
                        key={name}
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        error={error}
                        defaultValue={formData?.get(name) as string}
                        required
                    />
                ))}

                <Button loading={loading}>Log in</Button>

                {/* auth Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <Link
                        href={PAGES.PUBLIC.AUTH.REGISTER}
                        className="text-primary font-medium hover:underline"
                    >
                        Register Now
                    </Link>
                </p>
            </form>
        </FormContainer>
    );
}
