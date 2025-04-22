// viewModels/LoginViewModel.ts

import {makeAutoObservable} from "mobx";
import TokenStorage from "@/app/storage/TokenStorage";
import {loginRepository} from "@/app/login/LoginRepository";

class LoginViewModel {
    mobile = '';
    otp = '';
    showOtp = false;
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    // Methods to change state
    setMobile(mobile: string) {
        this.mobile = mobile;
    }

    setOtp(otp: string) {
        this.otp = otp;
    }

    setShowOtp(showOtp: boolean) {
        this.showOtp = showOtp;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    async sendOtp(mobile: string) {
        this.setLoading(true);
        this.setError('');

        try {
            const response = await loginRepository.sendOtp(mobile); // Call sendOtp method from repository
            if (response.error) {
                this.setError(response.error);
            } else {
                this.setShowOtp(true);
            }
        } catch (error: any) {
            this.setError(error.message || 'Something went wrong');
        } finally {
            this.setLoading(false);
        }
    }

    async verifyOtp(mobile: string, otp: string) {
        this.setLoading(true);
        this.setError('');

        try {
            const response = await loginRepository.verifyOtp(mobile, otp); // Call verifyOtp method from repository
            if (response.error) {
                this.setError(response.error);
            } else {
                TokenStorage.putToken(response.data?.token || '');
                alert('Login successful!');
            }
        } catch (error: any) {
            this.setError(error.message || 'Something went wrong');
        } finally {
            this.setLoading(false);
        }
    }


}

export const loginViewModel = new LoginViewModel();
