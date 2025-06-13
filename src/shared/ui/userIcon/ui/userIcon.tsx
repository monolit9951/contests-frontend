import clsx from 'clsx'
import userImg from 'shared/assets/img/userIMG.jpg'
import { Image } from 'shared/ui/image'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './userIcon.scss'

interface Props {
    src?: string
    alt?: string
    size?: number
    userName?: string
    className?: string
    wrapperClassName?: string
}

export const UserIcon = (props: Props) => {
    const {
        src,
        alt,
        size = 44,
        userName,
        className,
        wrapperClassName,
        ...rest
    } = props

    if (userName) {
        return (
            <HStack className={clsx('userImg userImg_container', wrapperClassName)}>
                <Image
                    src={src ?? userImg}
                    alt={alt ?? 'User`s image'}
                    width={size}
                    height={size}
                    round
                    className={clsx(className)}
                    onError={(e) => {
                        e.currentTarget.src = userImg
                        e.currentTarget.onerror = null
                    }}
                    {...rest}
                />
                {userName && (
                    <Text Tag='span' bold size='sm'>
                        {userName}
                    </Text>
                )}
            </HStack>
        )
    }

    return (
        <Image
            src={src ?? userImg}
            alt={alt ?? 'User`s image'}
            width={size}
            height={size}
            round
            className={clsx(className)}
            onError={(e) => {
                e.currentTarget.src = userImg
                e.currentTarget.onerror = null
            }}
            {...rest}
        />
    )
}
