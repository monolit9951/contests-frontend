import React from 'react';
import clsx from "clsx";
import {useTheme} from "entities/theme";
import workMedia  from 'entities/work/assets/Frame 144.jpg';
import {Work} from "entities/work/model/types";
import prize from 'shared/assets/icons/trophyF.svg?react'
import userIcon from 'shared/assets/img/userIMG.jpg';
import {Button} from "shared/ui/button";
import {Image} from "shared/ui/image";
import {Flex, HStack, VStack} from "shared/ui/stack";
import {Text} from "shared/ui/text";

import './workPreview.scss'
import {Icon} from "shared/ui/icon";

interface WorkProps {
    work: Work;
}

export const WorkPreview: React.FC<WorkProps> = ({ work, }) => {
    const {theme} = useTheme();
    console.log(work, 'work')

    const handleClick = () => {
        alert('clicked');
    }
    return (
        <Flex className="work-preview">
            <HStack>
                <Image src={workMedia} alt=''/>
                <VStack className='contest_desc'>
                    <VStack>
                        <HStack className='upper-desc'>
                            <HStack className='align__center'>
                                <Image src={userIcon} alt=''/>
                                <Text Tag='span'>name</Text>
                                <Text Tag='span' className='date'>1d</Text>
                            </HStack>
                            <Button variant="ghost" onClick={handleClick}>...</Button>
                        </HStack>
                        <Text Tag='p'>asdfasdfasdfadas</Text>
                        <HStack className={clsx(theme, 'tag-contest align__center')}>
                            <div className='icon-box'>
                                <Icon Svg={prize} className='icon-work__prev' />
                            </div>
                            <Text Tag='span'>asdasd</Text>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </Flex>
    );
};

