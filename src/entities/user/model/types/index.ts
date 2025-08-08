export type VerificationStatus = 'BLOGGER' | 'STORE' | 'COMPANY'

export interface User {
    id: string
    name: string
    organizerRating: number | null
    participantRating: number
    verificationStatus: VerificationStatus | null
    profileImage: string
    createdAt: string
    email: string
}

export type Organizer = User
// export type Organizer = Omit<User, 'participantRating'>
