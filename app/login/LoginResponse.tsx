export interface UserDetailsResponse {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
}

export interface RequestOtpResponse {
    msg?: string;
    otp?: string;
    token?: string;
    userDetailResponse?: UserDetailsResponse;
}
