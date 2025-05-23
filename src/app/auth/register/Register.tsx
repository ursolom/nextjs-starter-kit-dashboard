"use client";

import { registerAction } from "@/actions/auth";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TState } from "@/types";
import { useActionState, useEffect } from "react";
import { RegisterInputs } from "../inputs";
import Link from "next/link";
import FormContainer from "../FormContainer";
import { PAGES } from "@/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialState: TState = {
    message: "",
    error: {},
    status: null,
    formData: null,
};

const headerText = {
    title: "Create an Account",
    subTitle: "Enter your details below to create your account."
};

export default function RegisterPage() {
    const router = useRouter();
    const [state, action, loading] = useActionState(registerAction, initialState);
    const { error, formData, status, message } = state;

    useEffect(() => {
        if (status === 200 || status === 201) {
            toast.success(message as string);
            router.replace(PAGES.USER.ACCOUNT);
        }
    }, [status]);

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
                        required
                    />
                ))}

                <Button loading={loading}>Register Now</Button>

                {/* auth Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link
                        href={PAGES.PUBLIC.AUTH.LOGIN}
                        className="text-primary font-medium hover:underline"
                    >
                        Login Now
                    </Link>
                </p>
            </form>
        </FormContainer>
    );
}
