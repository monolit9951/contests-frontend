import {Work} from "entities/work/model/types";
import {WorkComponent} from "entities/work/ui/workComponent";
import VStack from 'shared/ui/stack/vStack/vStack'

import "./feedPage.scss"

const work: Work = {
    id: "66433ab54469296ffaf10209",
    ownerId: "66433ab44469296ffaf0fee5",
    description: "Test Description for Work 417",
    media: [
        {
            id: "66433ab54469296ffaf1025c",
            ownerId: "66433ab54469296ffaf10209",
            mediaLink: "https://example.com/image17.jpg"
        },
        {
            id: "66433ab54469296ffaf1025c",
            ownerId: "66433ab54469296ffaf10209",
            mediaLink: "https://example.com/image17.jpg"
        }
    ],
    likeAmount: 12,
    commentAmount: 371,
    user: {
        id: "66433ab34469296ffaf0f6bb",
        name: "Grace Moore",
        participantRating: 3.93,
        organizerRating: null,
        verificationStatus: "STORE",
        profileImage: "https://example.profileImage.com/image12.jpg"
    },
    typeWork: "VIDEO"
};
export const FeedPage = () => {
    return (
        <VStack className="feed-page-wrapper">
            <h1>FeedPage</h1>
            <WorkComponent work={work} />
        </VStack>
    )
}