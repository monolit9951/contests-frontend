import img1 from 'shared/assets/img/userIMG3.jpg'

export const mockWorks = [
    {
        id: "1",
        ownerId: "1",
        description: "Test Description for Work 1",
        media: [
            {
                id: "1-1",
                ownerId: "1",
                mediaLink: img1
            },
            {
                id: "1-2",
                ownerId: "1",
                mediaLink: img1
            },
            {
                id: "1-3",
                ownerId: "1",
                mediaLink: img1
            }
        ],
        likeAmount: 120,
        commentAmount: 324,
        user: {
            id: "1",
            name: "John Doe",
            participantRating: 3.26,
            organizerRating: null,
            verificationStatus: "VERIFIED",
            profileImage: "/src/assets/images/profile.jpg"
        },
        typeWork: "IMAGE"
    }
];
