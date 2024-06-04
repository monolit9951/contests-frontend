import clsx from 'clsx'
import userImg from 'shared/assets/img/userIMG.jpg'
import { Image } from 'shared/ui/image'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './userIcon.scss'

interface Props {
    userImage?: string
    size?: number
    userName?: string
    className?: string
}

export const UserIcon = (props: Props) => {
    const { userImage, size = 44, userName, className } = props

    return (
        <HStack className={clsx('userImg_container', className)}>
            <Image
                src={userImg ?? userImage}
                alt='userIMG'
                width={size}
                height={size}
                round
            />
            {userName && (
                <Text Tag='span' bold size='sm'>
                    {userName}
                </Text>
            )}
        </HStack>
    )
}
