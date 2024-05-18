import trash from 'shared/assets/icons/trash.svg?react'
import win1 from 'shared/assets/icons/win1.svg?react'
import win2 from 'shared/assets/icons/win2.svg?react'
import win3 from 'shared/assets/icons/win3.svg?react'
import win4 from 'shared/assets/icons/win4.svg?react'
import { Button } from 'shared/ui/button'
import { PrizePlace } from 'shared/ui/prizePlace'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './prizeInformation.scss'

export const PrizeInformation = () => {
    return (
        <VStack className='prizeInformation_container'>
            <Text Tag='h2' className='prizeInformation_header'>
                Prize Information
            </Text>
            <VStack className='prizePlaces_container'>
                <PrizePlace winIcon={win1} deleteIcon={trash} />
                <PrizePlace winIcon={win2} deleteIcon={trash} />
                <PrizePlace winIcon={win3} deleteIcon={trash} />
                <PrizePlace winIcon={win4} deleteIcon={trash} />
            </VStack>
            <Button variant='secondary' className='addPrizePlace_btn'>
                <Text Tag='p'>Add prize place</Text>
            </Button>
        </VStack>
    )
}