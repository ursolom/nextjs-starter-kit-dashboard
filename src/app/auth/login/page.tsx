"use client";

import { registerAction } from "@/actions/auth";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TState } from "@/types";
import { useActionState } from "react";
import { RegisterInputs } from "../inputs";
import Link from "next/link";
import FormContainer from "../FromContainer";

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

export default function RegisterPage() {
    const [state, action, loading] = useActionState(registerAction, initialState);
    const { error, formData } = state;

    return (
        <FormContainer headerText={headerText}>
            <form action={action} className="flex flex-col gap-4">
                {RegisterInputs.map(({ label, name, placeholder, type }) => (
                    <Input
                        key={name}
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        error={error}
                        defaultValue={formData?.get(name) as string}
                    />
                ))}

                <Button loading={loading}>Register Now</Button>

                {/* auth Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </FormContainer>
    );
}