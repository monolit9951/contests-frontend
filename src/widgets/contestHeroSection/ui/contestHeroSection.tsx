import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import creatorIMG from 'shared/assets/img/userIMG3.jpg'
import { Image } from 'shared/ui/image'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './contestHeroSection.scss'

const ContestHeroSection = () => {
    const contestHeroIMG =
        'http://localhost:3000/src/shared/assets/img/contest@2x.jpg'

    return (
        <section className='works-hero'>
            <div
                className='works-hero__image'
                style={{
                    backgroundImage: `url(${contestHeroIMG})`,
                }}
            />

            <HStack className='works-hero__creator'>
                <Image
                    src={creatorIMG}
                    alt='Creator'
                    width={140}
                    height={140}
                />
                <VStack>
                    <HStack className='align__center'>
                        <Text Tag='span' bold size='l'>
                            {/* {rest.contestOwner?.name} */}
                            Mitchell O&apos;Connell
                        </Text>
                        <Verified />
                    </HStack>
                    <HStack className='align__center'>
                        <Text Tag='span' bold size='sm'>
                            {/* {rest.contestOwner.organizerRating.toFixed(1)} */}
                            4.5
                        </Text>
                        <Star />
                    </HStack>
                </VStack>
            </HStack>
        </section>
    )
}

export default ContestHeroSection
