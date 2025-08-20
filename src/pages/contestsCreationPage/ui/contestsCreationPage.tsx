import { useState } from 'react'
import { CreateContestForm } from 'features/createContest'
import { ContestPaymentModal } from 'shared/ui/contestPaymentModal'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './contestsCreationPage.scss'

export const ContestsCreationPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ContestPaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <VStack className='contestsCreationPage_container'>
                <Text Tag='h2'>Contest creation</Text>

                <CreateContestForm />
            </VStack>
        </>
    )
}
