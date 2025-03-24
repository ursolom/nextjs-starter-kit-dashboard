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
import { MdError } from "react-icons/md";
import Alert from "@/components/ui/Alert";

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

const isSuccessStatus = (status: TState['status']): status is 200 | 201 =>
    status === 200 || status === 201;

const isErrorStatus = (status: TState['status']): status is 401 | 404 =>
    status === 401 || status === 404;

export default function LoginPage() {
    const [state, action, loading] = useActionState(loginAction, initialState);
    const router = useRouter();
    const { error, formData, status, message } = state;

    useEffect(() => {
        if (!status || !message) return;

        if (isSuccessStatus(status)) {
            toast.success(message);
            router.replace(PAGES.USER.ACCOUNT);
        } else {
            toast.error(message);
        }
    }, [status, message]);

    return (
        <FormContainer headerText={headerText}>
            <form action={action} className="flex flex-col gap-4">
                {isErrorStatus(status) && message && (
                    <Alert status="error">
                        {message}
                    </Alert>
                )}

                {LoginInputs.map((input) => (
                    <Input
                        key={input.name}
                        {...input}
                        error={error}
                        defaultValue={formData?.get(input.name) as string}
                        required
                    />
                ))}

                <Button loading={loading}>Log in</Button>

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