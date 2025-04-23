"use client"; // This makes the component a Client Component
import TokenStorage from "@/app/storage/TokenStorage";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import LoginMainUi from "@/app/login/LoginMainUi";
import SupportedExamsForm from "@/app/admin/input/exam/SupportedExamFormUi";
import DashboardPage from "@/app/dashboard/page";

const LoginPage: React.FC = () => {
    const router = useRouter();

    // useEffect(() => {
    //     if (TokenStorage.hasToken()) {
    //         router.replace("/dashboard");
    //         return
    //     }
    // }, [router]);
    return <DashboardPage/>;
};

export default LoginPage;