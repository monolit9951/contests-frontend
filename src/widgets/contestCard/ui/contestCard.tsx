import React from "react";
import {useTheme} from "entities/theme";
import Verified from "shared/assets/icons/SealCheck.svg?react";
import Star from "shared/assets/icons/Star.svg?react";
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react';
import contestImg from "shared/assets/img/contestBG.png";
import {Button} from "shared/ui/button";
import {Image} from "shared/ui/Image";
import {VStack} from "shared/ui/Stack";
import Flex from "shared/ui/Stack/Flex/Flex";
import {Tag} from "shared/ui/Tag";
import {Text} from "shared/ui/Text";
import {TopUser} from "shared/ui/topUser";

import "./contestCard.scss";

interface ContestCardProps {
  date?: string;
  category?: { des: string, color: string };
  prize?: {
    img: string,
    description: string,
    background: string
  } | null;
  title?: string;
  tags?: string[];
  user: {
    name: string,
    avatar: string,
    isVerified: boolean,
    isTop?: string,
    rate?: string,
  };
}


export const ContestCard: React.FC<ContestCardProps> = ({date, ...rest}) => {
  const {theme} = useTheme()
  const getCategoryColor = () => {
    if (rest.category?.des === "fun") {
      return "green";
    } if (rest.category?.des === "work") {
      return "purple";
    }
    // Default color if category is not 'fun' or 'work'
    return "blue";
  };

  return (
      <div className={`contest-card-wrapper ${theme}`}>
        <Flex className="justify__between align__center">
          <Flex className="align__center">
            <Image alt="" src={rest.user?.avatar} className="user-avatar"/>
            <VStack className="user-des">
              <Flex className="align__center">
                <Text Tag="span">{rest.user?.name}</Text>
                {rest.user.isVerified && <Verified/>}
              </Flex>
              <Flex className="justify__between align__center">
                <TopUser topRate={3}/>
                {
                    rest.user.rate &&
                    <Flex className="align__center">
                        <span>{rest.user?.rate}</span>
                        <Star/>
                    </Flex>
                }
              </Flex>
            </VStack>
          </Flex>
          <Tag type="fun" className="tag"/>
        </Flex>
        <div className="contest-card-body">
          <div className="image-box">
            <Image alt="" src={contestImg}/>
            <div className="prize" style={{background: getCategoryColor()}}>
              <PrizeIcon/>
              <span>{rest.prize?.description}</span>
            </div>
          </div>
        </div>
        <div className="contest-card-title">
          <h4 className="title">{rest.title}</h4>
          <div className="segments">
            {rest.tags?.map((tag, index) => (
                <div key={index} className={`${theme}`}>{tag}</div>
            ))}
          </div>
        </div>
        <div className="btn-box">
          <div className="date">
            <p>Completing the task</p>
            <span>until {date}</span>
          </div>
          <Button variant="secondary">See details</Button>
        </div>
      </div>
  );
};
