'use client';

import {useState} from 'react';
import {Phone} from 'lucide-react';
import ActionButton from "@/app/core/component/ActionButton";
import EditText from "@/app/core/component/AppEditText";
import {loginRepository} from "@/app/login/LoginRepository";

export default function LoginMainUi() {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    const handleSendOtp = () => {
        if (mobile.length === 10) {
            loginRepository.sendOtp(mobile).then()
        } else {
            alert('Enter a valid mobile number');
        }
    };

    const handleSubmit = () => {
        alert(`Logging in with mobile: ${mobile} and OTP: ${otp}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <EditText
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    type="tel"
                    icon={<Phone size={16}/>}
                    className="mb-4"
                />

                {showOtp && (
                    <EditText
                        name="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter mobile number"
                        type="tel"
                        icon={<Phone size={16}/>}
                        className="mb-4"
                    />
                )}

                {!showOtp ? (
                    <ActionButton text="Send OTP" onClick={handleSendOtp} status={"idle"}/>
                ) : (
                    <ActionButton
                        onClick={handleSubmit}
                        status={"idle"}
                        text="Submit"/>
                )}
            </div>
        </div>
    );
}
