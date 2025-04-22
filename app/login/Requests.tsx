export class RequestOtpReqBody {
    phoneNumber: string | null;

    constructor(phoneNumber: string | null) {
        this.phoneNumber = phoneNumber;
    }

    isValid(): boolean {
        if (!this.phoneNumber) return false;
        return this.phoneNumber.length === 10;
    }
}
export class VerifyOtpReqBody {
    constructor(
        public phoneNumber: string,
        public otp: string
    ) {}

    isValid() {
        return !!this.phoneNumber && !!this.otp;
    }
}
