'use client';

// pages/LoginMainUi.tsx
import React, {useEffect} from 'react';
import {Phone} from 'lucide-react';
import ActionButton from "@/app/core/component/ActionButton";
import EditText from "@/app/core/component/AppEditText";
import {useRouter} from "next/navigation";
import {observer} from 'mobx-react-lite';
import {loginViewModel} from "@/app/login/LoginViewModel";

const LoginMainUi = observer(() => {
    const router = useRouter();

    // Local state subscription to MobX observable values
    const {mobile, otp, showOtp, loading, error} = loginViewModel;

    const handleSendOtp = () => {
        if (mobile.length === 10) {
            loginViewModel.sendOtp(mobile).then(() => {
            });
        } else {
            alert('Enter a valid mobile number');
        }
    };

    const handleSubmit = () => {
        if (mobile.length === 10 && otp.length > 0) {
            loginViewModel.verifyOtp(mobile, otp).then(() => {
                router.replace("/dashboard")
            });
        }
    };

    useEffect(() => {

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <EditText
                    name="mobile"
                    value={mobile}
                    onChange={(e) => loginViewModel.setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    type="tel"
                    icon={<Phone size={16}/>}
                    className="mb-4"
                />

                {showOtp && (
                    <EditText
                        name="otp"
                        value={otp}
                        onChange={(e) => loginViewModel.setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        type="tel"
                        icon={<Phone size={16}/>}
                        className="mb-4"
                    />
                )}

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                {!showOtp ? (
                    <ActionButton
                        text="Send OTP"
                        onClick={handleSendOtp}
                        status={loading ? "loading" : "idle"}
                    />
                ) : (
                    <ActionButton
                        text="Submit"
                        onClick={handleSubmit}
                        status={loading ? "loading" : "idle"}
                    />
                )}
            </div>
        </div>
    );
});

export default LoginMainUi;
