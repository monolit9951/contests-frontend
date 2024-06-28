import React from 'react';
import clsx from "clsx";
import {useTheme} from "entities/theme";
import workMedia  from 'entities/work/assets/Frame 144.jpg';
import {Work} from "entities/work/model/types";
import commentIcon from 'shared/assets/icons/chat.svg?react'
import shareIcon from 'shared/assets/icons/share.svg?react'
import prize from 'shared/assets/icons/trophyF.svg?react'
import userIcon from 'shared/assets/img/userIMG.jpg';
import img1 from 'shared/assets/img/userIMG3.jpg'
import {Button} from "shared/ui/button";
import {Icon} from "shared/ui/icon";
import {Image} from "shared/ui/image";
import {RateButtons} from "shared/ui/rateButtons";
import {Flex, HStack, VStack} from "shared/ui/stack";
import {Text} from "shared/ui/text";
import {ImageSlider} from "widgets/worksSection/ui/workPreview/imageSlider/imageSlider";

import './workPreview.scss'

interface WorkProps {
    work: Work;
}

export const WorkPreview: React.FC<WorkProps> = ({ work }) => {
    const {theme} = useTheme();
    console.log(work, 'work')

    const handleClick = () => {
        alert('clicked');
    }

    const mockImages = [img1, img1, img1]

    // const imageUrls = work.media.map((mediaItem) => mediaItem.mediaLink);

    return (
        <Flex className="work-preview">
            <HStack>
                {work.typeWork === "IMAGE" && <ImageSlider images={mockImages}/>}
                {work.typeWork === "VIDEO" && <Image src={workMedia} alt=''/>}
                <VStack className='contest_desc'>
                    <VStack>
                        <HStack className='upper-desc'>
                            <HStack className='align__center'>
                                <Image src={userIcon} alt=''/>
                                <Text Tag='span' bold>name</Text>
                                <Text Tag='span' className='date'>1d</Text>
                            </HStack>
                            <Button variant="ghost" onClick={handleClick} className='dots'>...</Button>
                        </HStack>
                        <Text Tag='p'>asdfasdfasdfadas</Text>
                        <HStack className={clsx(theme, 'tag-contest align__center')}>
                            <div className='icon-box'>
                                <Icon Svg={prize} className='icon-work__prev'/>
                            </div>
                            <Text Tag='p' size='xs' bold>asdasd</Text>
                            <Text Tag='span' size='xs'>&#8226;</Text>
                            <Text Tag='span' size='xs'>Active</Text>
                        </HStack>
                    </VStack>
                    <HStack className='btn-box justify__between'>
                        <HStack>
                            <RateButtons border likes={0}/>
                            <Button variant="secondary" onClick={handleClick} className='comment-btn'>
                                <Icon Svg={commentIcon}/>
                                203
                            </Button>
                        </HStack>
                        <Button variant='secondary' onClick={handleClick} className='share-btn'>
                            <Icon Svg={shareIcon}/>
                            Share
                        </Button>
                    </HStack>
                    <div className='hr'/>
                </VStack>
            </HStack>
        </Flex>
    );
};

