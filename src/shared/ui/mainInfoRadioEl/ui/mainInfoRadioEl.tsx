import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './mainInfoRadioEl.scss'

interface MainInfoRadioElProps {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    text: string
    currSelected?: string
    setCurrSelected?: React.Dispatch<React.SetStateAction<string>>
}

export const MainInfoRadioEl = ({
    svg,
    text,
    currSelected,
    setCurrSelected,
}: MainInfoRadioElProps) => {
    const classname =
        text === currSelected
            ? 'mainInfoRadioEl_container active'
            : 'mainInfoRadioEl_container'
    return (
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div onClick={() => setCurrSelected?.(text)}>
            <VStack className={classname}>
                <Icon Svg={svg} height={32} width={32} />
                <Text Tag='p' className='mainInfoRadioEl_container_text'>
                    {text}
                </Text>
            </VStack>
        </div>
    )
}
