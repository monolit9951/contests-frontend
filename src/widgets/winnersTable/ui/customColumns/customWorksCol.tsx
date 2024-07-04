import { FC } from 'react'
import { Work } from 'entities/work'
import instance from 'shared/api/api'
import arrow from 'shared/assets/icons/arrowUpRight.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'

export const WorkLinkRenderer: FC<{
    value: string
    openModal: (work: Work) => void
}> = ({ value, openModal }) => {
    const handleClick = async () => {
        try {
            const { data } = await instance.get(`works/${value}`)

            openModal(data)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)
        }
    }

    return (
        <Button variant='secondary' onClick={handleClick} className='work-link'>
            View Work
            <Icon Svg={arrow} width={20} />
        </Button>
    )
}
