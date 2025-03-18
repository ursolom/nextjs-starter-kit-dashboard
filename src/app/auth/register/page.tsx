import { Metadata } from "next";
import { PAGE_TITLES, SITE } from "@/constants";
import RegisterPage from "./Register";

export const metadata: Metadata = {
    title: PAGE_TITLES.REGISTER,
    description: SITE.DESCRIPTION,
};

export default function Register() {
    return <RegisterPage />;
}
