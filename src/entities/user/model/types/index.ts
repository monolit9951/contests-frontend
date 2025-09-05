export type VerificationStatus = 'BLOGGER' | 'STORE' | 'COMPANY'

export interface User {
    id: string
    name: string
    username: string
    organizerRating: number | null
    participantRating: number
    verificationStatus: VerificationStatus | null
    profileImage: string | null
    createdAt: string
    email: string
    aboutMe: string | null
}

export type Organizer = User
// export type Organizer = Omit<User, 'participantRating'>
