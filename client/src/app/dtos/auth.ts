export interface LoginDto {
    email: string,
    password: string,
}

export interface SignupDto {
    name: string,
    email: string,
    password: string,
}

export interface LoggedInDto {
    access_token: string;
    expires_in: number;
}