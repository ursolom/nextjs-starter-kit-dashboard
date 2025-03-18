"use client";

import { registerAction } from "@/actions/auth";
import { useActionState } from "react";

export default function RegisterPage() {
    const { state, action } = useActionState(registerAction)
    return (
        <div>hello to sing in </div>
    )
}