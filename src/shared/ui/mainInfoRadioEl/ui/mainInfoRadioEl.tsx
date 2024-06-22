// import { Icon } from 'shared/ui/icon'
// import { Flex, VStack } from 'shared/ui/stack'
// import { Text } from 'shared/ui/text'

// import './mainInfoRadioEl.scss'

// interface MainInfoRadioElProps {
//     svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
//     text: string
//     currSelected?: string
//     setCurrSelected?: React.Dispatch<React.SetStateAction<string>>
// }

// export const MainInfoRadioEl = ({
//     svg,
//     text,
//     currSelected,
//     setCurrSelected,
// }: MainInfoRadioElProps) => {
//     const classname =
//         text === currSelected
//             ? 'mainInfoRadioEl_container active'
//             : 'mainInfoRadioEl_container'
//     return (
//         <Flex clickFunction={() => setCurrSelected?.(text)}>
//             <VStack className={classname}>
//                 <Icon Svg={svg} height={32} width={32} />
//                 <Text Tag='p' className='mainInfoRadioEl_container_text'>
//                     {text}
//                 </Text>
//             </VStack>
//         </Flex>
//     )
// }



// MainInfoRadioEl.tsx
import React from 'react';
import { Icon } from 'shared/ui/icon';
import { Flex, VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';

import './mainInfoRadioEl.scss';

interface MainInfoRadioElProps {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
    currSelected?: string;
    handleClick?: (text: string) => void;
}

export const MainInfoRadioEl: React.FC<MainInfoRadioElProps> = ({
    svg,
    text,
    currSelected,
    handleClick,
}) => {
    const classname =
        text === currSelected
            ? 'mainInfoRadioEl_container active'
            : 'mainInfoRadioEl_container';

    return (
        <Flex clickFunction={() => handleClick?.(text)}>
            <VStack className={classname}>
                <Icon Svg={svg} height={32} width={32} />
                <Text Tag='p' className='mainInfoRadioEl_container_text'>
                    {text}
                </Text>
            </VStack>
        </Flex>
    );
};

