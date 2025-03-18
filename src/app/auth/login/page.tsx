import { Metadata } from "next";
import LoginPage from "./Login";
import { PAGE_TITLES, SITE } from "@/constants";

export const metadata: Metadata = {
    title: PAGE_TITLES.LOGIN,
    description: SITE.DESCRIPTION,
};

export default function Login() {
    return <LoginPage />;
}
