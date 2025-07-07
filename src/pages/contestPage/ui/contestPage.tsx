import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Contest } from 'entities/contest'
import { Work } from 'entities/work'
import useAxios from 'shared/lib/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { CommentsSection } from 'widgets/commentsSection'
import UploadWorkModal from 'widgets/uploadWorkModal'
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
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [isUploadWorkModalOpen, setIsUploadWorkModalOpen] = useState<boolean>(false)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)

    if (!id) {
        return (
            <div className='contest__error-message'>
                <Text Tag='p' bold size='xl'>
                    Something went wrong
                </Text>
                <Button variant='secondary' onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>
        )
    }

    const { data, isLoading, error } = useAxios<Contest>(`contests/${id}`)

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

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    if (isLoading) {
        return <Spinner center />
    }

    if (!data) {
        return (
            <div className='contest__error-message'>
                <Text Tag='p' bold size='xl'>
                    Request error{`: ${error?.message}`}
                </Text>
                <Button variant='secondary' onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>
        )
    }

    const openModal = (work: Work) => {
        setSelectedWork(work)
        setIsModalOpen(true)
    }

    const getModalMaxWidth = (work: Work | null): string => {
        if (work?.typeWork === 'TEXT') {
            return '520px'
        }
        return '100%'
    }

    // коллбек для аплоад ворк модал
    const handleOpenWorkUploadModal = () =>{
        setIsUploadWorkModalOpen(true)
    }

    return (
        <VStack className='contest'>
            <HeroSection bg={data.backgroundImage} owner={data.contestOwner} />
            <VStack className='contest__container'>
                <DescriptionSection data={data} handleOpenWorkUploadModal={handleOpenWorkUploadModal} />
                {data.status === 'FINISHED' && !!data.winners?.length && (
                    <WinnersSection
                        data={data.winners}
                        openModal={openModal}
                    />
                )}
                <WorksListSection
                    worksAmount={data.participantAmount}
                    openModal={openModal}
                />
                <CommentsSection workId={id} contest />
            </VStack>

            {isModalOpen && (
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isOuterClose
                    maxWidth={getModalMaxWidth(selectedWork)}
                    height={windowWidth > 1024 ? '83%' : '88%'}
                    maxHeight={windowWidth >= 1024 ? '900px' : ''}
                    modalContentClass='work-preview-modal'>
                    {selectedWork && <WorkPreview work={selectedWork} />}
                </ModalWindow>
            )}

            {isUploadWorkModalOpen && (
                    <ModalWindow
                        isOpen={isUploadWorkModalOpen}
                        isOuterClose
                        onClose={() => setIsUploadWorkModalOpen(false)}>
                        <UploadWorkModal contestId = {data.id}/>
                    </ModalWindow>
                )
            }
        </VStack>
    )
}

export default ContestPage
