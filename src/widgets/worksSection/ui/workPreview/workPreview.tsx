import React from 'react';
import workMedia  from 'entities/work/assets/Frame 144.jpg';
import {Work} from "entities/work/model/types";
import userIcon from 'shared/assets/img/userIMG.jpg';
import {Button} from "shared/ui/button";
import {Image} from "shared/ui/image";
import {Flex, HStack, VStack} from "shared/ui/stack";
import {Text} from "shared/ui/text";

interface WorkProps {
    work: Work;
    openModal: () => void;
}

export const WorkPreview: React.FC<WorkProps> = ({ work, openModal }) => {

    const handleClick = () => {
        alert('clicked');
    }
    return (
        <Flex className="work" clickFunction={openModal}>
            <HStack>
                <Image src={workMedia} alt=''/>
                <VStack className='contest_desc'>
                    <HStack>
                        <HStack>
                            <Image src={userIcon} alt=''/>
                            <Text Tag='span'>{work.user.name}</Text>
                            <Text Tag='span'>1d</Text>
                        </HStack>
                        <Button variant="ghost" onClick={handleClick}>...</Button>
                    </HStack>
                </VStack>
            </HStack>
        </Flex>
    );
};

