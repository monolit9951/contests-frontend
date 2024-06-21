import { FC } from 'react'
import { HStack } from 'shared/ui/stack'
import { UserIcon } from 'shared/ui/userIcon'

export const NameRenderer: FC<{ value: string }> = ({ value }) => {
    const [image, name] = value.split(',')

    return (
        <HStack className='name-cell'>
            <UserIcon src={image} userName={name} size={40} />
        </HStack>
    )
}
