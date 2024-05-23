export interface Media {
    id: string;
    ownerId: string;
    mediaLink: string;
}

export interface User {
    id: string;
    name: string;
    participantRating: number;
    organizerRating: number | null;
    verificationStatus: string;
    profileImage: string;
}

export interface Work {
    id: string;
    ownerId: string;
    description: string;
    media: Media[] | null;
    likeAmount: number;
    commentAmount: number;
    user: User;
    typeWork: string;
}
