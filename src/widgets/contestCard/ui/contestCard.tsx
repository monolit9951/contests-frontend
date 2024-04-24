import React from "react";
import { Button } from "shared/ui/button";

import "./contestCard.scss";

interface ContestCardProps {
  date?: string;
  name?: string;
  isVerified?: boolean;
  rating?: string;
  category: string | null;
  prize?: {
    img: string,
    description: string,
  } | null;
  title?: string;
  tags?: string;
}

export const ContestCard: React.FC<ContestCardProps> = ({ date, ...rest }) => {
  return (
      <div className="contest-card-wrapper">
        <div className="contest-card-header">
          <div className="user-box">
            <img alt=""/>
            <div className="user-des">
              <div className="name-box">
                <span>{rest.name}</span>
                {rest.isVerified && <img alt=""/>}
              </div>
              {
                rest.rating &&
                  <div className="rating">
                      <span>{rest.rating}</span>
                      <img alt="" />
                  </div>
              }
            </div>
          </div>
          <div className="tag">{rest.category}</div>
        </div>
        <div className="contest-card-body">
          <div className="image-box">
            <img alt="" />
            <div className="prize">
              <img alt=""/>
              <span>{rest.prize?.description}</span>
            </div>
          </div>
          <div className="contest-card-title">
            <h4 className="title">{rest.title}</h4>
            <div className="segments">
              <div>{rest.tags}</div>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <div className="date">
            <p>Completing the task</p>
            <span>{date}</span>
          </div>
          <Button>See details</Button>
        </div>
      </div>
  );
};
