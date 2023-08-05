import {UserSessionInterface} from "@core/modules/session/UserSessionInterface";
import {LoginResponseInterface} from "../types/api/responses/LoginResponseInterface";

export class SessionMappers {
    static mapLoginResponseToUserSession(session: LoginResponseInterface ): UserSessionInterface {
        return {
            email: session.email,
            id: session.id,
            lastName: session.lastName,
            name: session.name,
            sessionExpiresAt: new Date(session.refreshToken.expiryAt)
        }
    }
}
