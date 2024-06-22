import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setContestOpen, setSelectionType } from 'pages/contestsCreationPage/model/services';
import { Icon } from 'shared/ui/icon';
import { HStack, VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';

import './mainInfoRadioElContainer.scss';

interface MainInfoRadioElContainerProps {
    text: string;
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode[];
    currActive: string;
}

export const MainInfoRadioElContainer: React.FC<MainInfoRadioElContainerProps> = ({
    text,
    svg,
    children,
    currActive,
}) => {
    const [currSelected, setCurrSelected] = useState<string>(currActive);
    const dispatch: AppDispatch = useDispatch();

    const handleClick = (childText: string) => {
        let value;
        if (text === 'Type of competition') {
            dispatch(setContestOpen(childText === 'Open'));
        } else if (text === 'Winner selection type') {
            switch(childText){
                case "Viewer voting":
                    value = "VIEWER_VOTING"
                    break;
                case "Creator's decision":
                    value = "CREATOR_DECISION"
                    break;
                default:
                    value = "RANDOM"
                    break;  
            }
            dispatch(setSelectionType(value))
        }
        setCurrSelected(childText);
    };

    return (
        <VStack className='mainInfoRadioElContainer_container'>
            <HStack className='text_icon_container'>
                <Text Tag='p'>{text}</Text>
                <Icon Svg={svg} height={20} width={20} />
            </HStack>
            <HStack className='radioElements_container'>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(
                            child,
                            { currSelected, handleClick }
                        );
                    }
                    return null;
                })}
            </HStack>
        </VStack>
    );
};

