export interface LoginResponseInterface {
    id: number,
    email: string,
    name: string,
    lastName: string,
    accessToken: string,
    refreshToken: {
        code: string,
        expiryAt: string,
    },
}
