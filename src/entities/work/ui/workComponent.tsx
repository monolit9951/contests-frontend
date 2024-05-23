import React from 'react';
import {Work} from "entities/work/model/types";

interface WorkProps {
    work: Work;
}

export const WorkComponent: React.FC<WorkProps> = ({ work }) => {
    return (
        <div className="work">
            <h2>{work.description}</h2>
            <div className="owner">
                <img src={work.user.profileImage} alt={work.user.name} />
                <h3>{work.user.name}</h3>
                <p>Rating: {work.user.participantRating}</p>
                <p>Status: {work.user.verificationStatus}</p>
            </div>
            <div className="media">
                {work.media?.map((mediaItem: any) => (
                    <img key={mediaItem.id} src={mediaItem.mediaLink} alt={`Media ${mediaItem.id}`} />
                ))}
            </div>
            <div className="stats">
                <p>Likes: {work.likeAmount}</p>
                <p>Comments: {work.commentAmount}</p>
            </div>
            <div className="type">
                <p>Type: {work.typeWork}</p>
            </div>
        </div>
    );
};
