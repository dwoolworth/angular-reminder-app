import { User } from "./user";

export interface LoginResponse {
    refreshToken: string;
    accessToken: string;
    user: User|undefined
}