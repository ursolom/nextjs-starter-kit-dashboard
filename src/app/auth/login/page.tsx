import { Metadata } from "next";
import LoginPage from "../../../components/auth/Login";
import { PAGE_TITLES, SITE } from "@/constants";

export const metadata: Metadata = {
    title: PAGE_TITLES.LOGIN,
    description: SITE.DESCRIPTION,
};

export default function LoginUser() {
    return <LoginPage title="Log in to your account" subTitle="Enter your email and password below to log in" admin={false} />;
}
