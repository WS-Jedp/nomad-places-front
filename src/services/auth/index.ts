import { Request } from "../../common/request";
import { ConfirmProfileDTO, LoginDTO, RegisterUserRequestDTO } from "../../dto/auth";
import { ProfileDTO, UpdatePersonalInformationDTO } from "../../dto/user";
import { Person, User } from "../../models/user";

export class AuthServices {
    protected request: Request;

    constructor(domain?: string) {
        this.request = new Request({
            domain: domain ? domain : "auth",
        });
    }

    async login(payload: { emailOrUsername: string, password: string }): Promise<LoginDTO> {
        const response = await this.request.post<LoginDTO>('login', { username: payload.emailOrUsername, password: payload.password })
        return response
    }

    async register(payload: RegisterUserRequestDTO) {
        const response = await this.request.post<LoginDTO>('register', payload)
        return response
    }

    async updateUserInformation(payload: { token: string, payload: UpdatePersonalInformationDTO }) {
        const response = await this.request.withAuth(payload.token).post<{
            data: {
                user: User,
                person: Person
            }
        }>('profile/update', payload.payload)
        return response
    }

    async logout() {
        const response = await this.request.post('logout')
        return response
    }

    async getPersonFromUser(payload: { token: string }, ) {
        const response = await this.request.withAuth(payload.token).get<ProfileDTO>('profile')
        return response
    }

    async userExists(emailOrUsername:string) {
        const response = await this.request.get<ConfirmProfileDTO>(`profile/confirm?usernameOrEmail=${emailOrUsername}`)
        return response
    }

    async recoverPassword(email:string, lang: string = 'es') {
        const response = await this.request.post<boolean>('recover-password', { email, language: lang })
        return response
    }

    async resetPassword(email: string, token: string, newPassword: string) {
        const response = await this.request.post<{message: string, user: User}>('reset-password', { email, token, newPassword })
        return response
    }

   
}