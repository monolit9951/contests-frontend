import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Organizer } from 'entities/user'
import dots from 'shared/assets/icons/tripleDot.svg'
// import Verified from 'shared/assets/icons/SealCheck.svg?react'
// import Star from 'shared/assets/icons/Star.svg?react'
import { Image } from 'shared/ui/image'
import { ModalWindow } from 'shared/ui/modalWindow'
// import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import ModalReport from 'widgets/modalReport'

import './heroSection.scss'

interface Props {
    bg: string
    owner: Organizer
    contestId: string
}

const ContestHeroSection = ({ bg, owner, contestId }: Props) => {
    const contestHeroIMG =
        'http://localhost:3000/src/shared/assets/img/contest@2x.jpg'

    const user = useSelector((state: RootState) => state.user)

    const [actions, setActions] = useState<boolean>(false)
    const [report, setReport] = useState<boolean>(false)

    const handleActions = () =>{
        setActions(!actions)
    }

    const handleReport = () =>{
        setReport(true)
    }

    return (
        <section className='contestHero'>
            <div
                className='contestHero_image'
                style={{
                    backgroundImage: `url(${bg ?? contestHeroIMG})`,
                }}
            />
            <div className="contestHero_container">
                <Link to={owner.id === user.userId? `/profile` : `/profile/${owner.id}`} >
                    <div className='contestHero_creator'>
                        <Image
                            src={owner?.profileImage ?? contestHeroIMG}
                            alt='Creator'
                            width={140}
                            height={140}
                            round
                        />

                        <div className='contestHero_creator_name'>
                            {owner?.name ? (
                                <>
                                    <Text Tag='span' bold size='l'>
                                        {owner?.name}
                                    </Text>
                                    {/* {owner.verificationStatus && <Verified />} */}
                                </>
                            ) : (
                                <Text Tag='span' bold size='l'>
                                    No name
                                </Text>
                            )}
                        </div>


                    </div>
                </Link>

                <div className="contestActions">
                    <button type='button' onClick={handleActions}><img src={dots} alt="dots" /></button>

                    {actions && <div className="contestActions_actions">
                        <button type='button' onClick={handleReport}>Report</button>
                        {user.userId === owner.id && <button type='button'>Edit</button>}
                        {user.userId === owner.id && <button type='button'>Delete</button>}

                        <button type='button' onClick={() => setActions(false)} className="contestActions_actions_onBlur" aria-label='close Actions' />
                    </div>}
                </div>
            </div>

            {report && <ModalWindow isOpen onClose={() => setReport(false)}><ModalReport targetType='CONTEST' targetId={contestId} onClose={() => setReport(false)}/></ModalWindow>}
        </section>
    )
}

export default ContestHeroSection
