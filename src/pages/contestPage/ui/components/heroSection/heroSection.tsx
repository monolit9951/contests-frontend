import { Organizer } from 'entities/user'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import creatorIMG from 'shared/assets/img/userIMG3.jpg'
import { Image } from 'shared/ui/image'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './heroSection.scss'

interface Props {
    bg: string
    owner: Organizer
}

const ContestHeroSection = ({ bg, owner }: Props) => {
    const contestHeroIMG =
        'http://localhost:3000/src/shared/assets/img/contest@2x.jpg'

    return (
        <section className='contest-hero'>
            <div
                className='contest-hero__image'
                style={{
                    backgroundImage: `url(${contestHeroIMG ?? bg})`,
                }}
            />

            <HStack className='contest-hero__creator'>
                <Image
                    src={creatorIMG ?? owner?.profileImage}
                    alt='Creator'
                    width={140}
                    height={140}
                    round
                />
                <VStack>
                    <HStack className='align__center'>
                        {owner?.name ? (
                            <>
                                <Text Tag='span' bold size='l'>
                                    {owner?.name}
                                </Text>
                                <Verified />
                            </>
                        ) : (
                            <Text Tag='span' bold size='l'>
                                No name
                            </Text>
                        )}
                    </HStack>
                    <HStack className='align__center'>
                        {owner?.organizerRating ? (
                            <>
                                <Text Tag='span' bold size='sm'>
                                    {owner?.organizerRating.toFixed(1)}
                                </Text>
                                <Star />
                            </>
                        ) : (
                            <Text Tag='span' bold size='sm'>
                                No rating
                            </Text>
                        )}
                    </HStack>
                </VStack>
            </HStack>
        </section>
    )
}

export default ContestHeroSection
