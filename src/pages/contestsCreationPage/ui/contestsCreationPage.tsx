import { useState } from 'react'
import { Helmet } from "react-helmet";
import { CreateContestForm } from 'features/createContest'
import { ContestPaymentModal } from 'shared/ui/contestPaymentModal'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './contestsCreationPage.scss'

export const ContestsCreationPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Helmet>
                <title>DareBay | Contest creation</title>
                <meta property="og:title" content='Contest creation page' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content='DareBay Contest creation page' />
                <meta property="og:description" content='DareBay Contest creation page' />
            </Helmet>

            <ContestPaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <VStack className='contestsCreationPage_container'>
                <Text Tag='h2'>Contest creation</Text>

                <CreateContestForm />
            </VStack>
        </>
    )
}
