import { Request } from "../../common/request";
import { ConfirmProfileDTO, LoginDTO, RegisterUserRequestDTO } from "../../dto/auth";
import { ProfileDTO } from "../../dto/user";

export class AuthServices {
    protected request: Request;

    constructor(domain?: string) {
        this.request = new Request({
            domain: domain ? domain : "auth",
        });
    }

    async login(payload: { emailOrUsername: string, password: string }) {
        const response = await this.request.post<LoginDTO>('login', { username: payload.emailOrUsername, password: payload.password })
        return response
    }

    async register(payload: RegisterUserRequestDTO) {
        const response = await this.request.post<LoginDTO>('register', payload)
        return response
    }

    async logout() {
        const response = await this.request.post('logout')
        return response
    }

    async getPersonFromUser(payload: { token: string }, ) {
        const response = await this.request.withAuth(payload.token).get<ProfileDTO>('auth/profile')
        return response
    }

    async userExists(emailOrUsername:string) {
        const response = await this.request.get<ConfirmProfileDTO>(`profile/confirm?usernameOrEmail=${emailOrUsername}`)
        return response
    }
}