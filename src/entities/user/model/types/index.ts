type VerificationStatus = 'BLOGGER' | 'STORE' | 'COMPANY'

export interface User {
    id: string
    name: string
    organizerRating: number
    participantRating: number
    verificationStatus: VerificationStatus
    profileImage: string
}
