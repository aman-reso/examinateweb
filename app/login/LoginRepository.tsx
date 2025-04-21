import {apiRequest} from "@/app/network/GenericApiHandler";
import {RequestOtpReqBody} from "@/app/login/Requests";


export const loginRepository = {

    sendOtp: async (mobile: string) => {
        const requestBody = new RequestOtpReqBody(mobile);
        if (!requestBody.isValid()) {
            throw new Error("Invalid phone number");
        }
        return await apiRequest<{ success: boolean; message?: string }, RequestOtpReqBody>({
            url: "users/request-otp",
            method: "POST",
            body: requestBody,
        });
    },


    verifyOtp: async (mobile: string, otp: string) => {
        return await apiRequest<{ success: boolean; message?: string }>({
            url: "/api/auth/verify-otp",
            method: "POST",
            body: {mobile, otp},
        });
    },
};
