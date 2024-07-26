export interface Tutor {
    _id: string
    username?: string
    profileImage?: string
    phone: string
    email: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean
}