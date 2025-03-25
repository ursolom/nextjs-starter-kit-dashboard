"use client";

import { loginAction } from "@/actions/auth";
import { TState } from "@/types";
import { useActionState, useEffect } from "react";
import { LoginInputs } from "../../app/auth/inputs";
import Link from "next/link";
import FormContainer from "../../app/auth/FormContainer";
import { PAGES } from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: TState = {
    message: "",
    error: {},
    status: null,
    formData: null,
};


const isSuccessStatus = (status: TState['status']) =>
    status === 200 || status === 201;

const isErrorStatus = (status: TState['status']) =>
    status === 401 || status === 404;
type TProps = {
    title: string,
    subTitle: string,
    admin: boolean
}
export default function LoginPage({ title, subTitle, admin }: TProps) {
    const [state, action, loading] = useActionState(
        (prevState: unknown, formData: FormData) => loginAction(prevState, formData, admin),
        initialState
    );
    const headerText = {
        title: title,
        subTitle: subTitle
    };

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