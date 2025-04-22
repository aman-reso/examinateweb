class TokenStorage {
    static TOKEN_KEY: string = 'auth_token';

    static putToken(token: string | null): void {
        if (token) {
            localStorage.setItem(this.TOKEN_KEY, token);
        } else {
            console.warn('Attempted to store a null/undefined token');
        }
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static hasToken(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
}

export default TokenStorage;

