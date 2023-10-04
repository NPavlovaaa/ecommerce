export type UserApi = {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    updatedAt: string,
    creationAt: string
}

export type UserModel = {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    updatedAt: Date,
    creationAt: Date
}

export const normalizeUser = (from: UserApi): UserModel => ({
    id: from.id,
    email: from.email,
    password: from.password,
    name: from.name,
    role: from.role,
    avatar: from.avatar,
    updatedAt: new Date(from.updatedAt),
    creationAt: new Date(from.creationAt)
})
