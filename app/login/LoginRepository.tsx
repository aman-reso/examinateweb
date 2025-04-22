import {apiRequest} from "@/app/network/GenericApiHandler";
import {RequestOtpReqBody, VerifyOtpReqBody} from "@/app/login/Requests";
import {ApiResponse} from "@/app/data/ApiResponse";
import {RequestOtpResponse} from "@/app/login/LoginResponse";

export const loginRepository = {

    sendOtp: async (mobile: string) => {
        const requestBody = new RequestOtpReqBody(mobile);
        if (!requestBody.isValid()) {
            throw new Error("Invalid phone number");
        }
        return await apiRequest<ApiResponse<RequestOtpResponse>, RequestOtpReqBody>({
            url: "users/request-otp",
            method: "POST",
            body: requestBody,
        });
    },


    verifyOtp: async (mobile: string, otp: string) => {
        return await apiRequest<ApiResponse<RequestOtpResponse>, VerifyOtpReqBody>({
            url: "users/verify-otp",
            method: "POST",
            body: new VerifyOtpReqBody(mobile, otp),
        });
    },
};
