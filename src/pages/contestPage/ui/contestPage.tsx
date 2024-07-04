import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Contest } from 'entities/contest'
import { Work } from 'entities/work'
import useAxios from 'shared/lib/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
import { CommentsSection } from 'widgets/commentsSection'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import { selectContestMedia, selectContestOwnerId } from '../model/selectors'
import { fetchMediaWorks } from '../model/services'
import { contestWorksActions } from '../model/slice'

import DescriptionSection from './components/descriptionSection/descriptionSection'
import HeroSection from './components/heroSection/heroSection'
import WinnersSection from './components/winnersSection/winnersSection'
import WorksListSection from './components/worksListSection/worksListSection'

import './contestPage.scss'

const ContestPage = () => {
    const { id } = useParams<{ id: string }>()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedWork, setSelectedWork] = useState<Work | null>(null)

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)

    if (!id) {
        return <p>Something went wrong</p>
    }

    const { data, isLoading } = useAxios<Contest>(`contests/${id}`)

    useEffect(() => {
        if (id !== ownerId) {
            dispatch(contestWorksActions.setOwnerId(id))
            dispatch(contestWorksActions.resetState())
        }

        if (id !== ownerId || !media.new.length) {
            dispatch(fetchMediaWorks(id))
        }
    }, [dispatch])

    useEffect(() => {
        if (data) {
            dispatch(contestWorksActions.setPrizes(data.prizes))
        }
    }, [dispatch, data])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>Request error</p>
    }

    const openModal = (work: Work) => {
        setSelectedWork(work)
        setIsModalOpen(true)
    }

    const getModalWidth = (work: Work | null): string => {
        if (work?.typeWork === 'TEXT') {
            return '520px'
        }
        return '1190px'
    }

    return (
        <VStack className='contest'>
            <HeroSection bg={data.backgroundImage} owner={data.contestOwner} />
            <VStack className='contest__container'>
                <DescriptionSection data={data} />
                {data.status === 'FINISHED' && data.topWinners?.length && (
                    <WinnersSection
                        data={data.topWinners}
                        openModal={openModal}
                    />
                )}
                <WorksListSection
                    worksAmount={data.participantAmount}
                    openModal={openModal}
                />
                <CommentsSection ownerId={id} />
            </VStack>

            {isModalOpen && (
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isOuterClose
                    width={getModalWidth(selectedWork)}
                    height='83%'
                    maxHeight='900px'
                    modalContentClass='work-preview-modal'>
                    {selectedWork && <WorkPreview work={selectedWork} />}
                </ModalWindow>
            )}
        </VStack>
    )
}

export default ContestPage
