import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContestName } from 'pages/contestsCreationPage/model/services';
import creatorsDecision from 'shared/assets/icons/creatorsDecision.svg?react'
import eye from 'shared/assets/icons/eye.svg?react'
import heart from 'shared/assets/icons/heart.svg?react'
import lock from 'shared/assets/icons/lock.svg?react'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import random from 'shared/assets/icons/random.svg?react'
import cardIMGPlaceholder from 'shared/assets/img/cardIMGPlaceholder.jpg'
import coverIMGPlaceholder from 'shared/assets/img/coverIMGPlaceholder.jpg'
import { DescriptionInput } from 'shared/ui/descriptionInput'
import { ImageUpload } from 'shared/ui/imageUpload'
import { Input } from 'shared/ui/input'
import { MainInfoRadioEl } from 'shared/ui/mainInfoRadioEl'
import { MainInfoRadioElContainer } from 'shared/ui/mainInfoRadioElContainer'
import { MainInformationCombobox } from 'shared/ui/mainInformationCombobox/ui/mainInformationCombobox'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import {categories, subcategories} from "../mockData"

import './mainInformation.scss'

export const MainInformation = React.memo(() => {
    const dispatch: AppDispatch = useDispatch();
    const contestCreationState = useSelector((state: RootState) => state.contestsCreationPage);
    console.log(contestCreationState)


    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setContestName(e.target.value));
    }, [dispatch]);
    return (
        <VStack className='mainInformation_container'>
            <VStack className='mainInformation_title_categories_container'>
                <Text Tag='h2' className='mainInformation_container_header'>
                    Main information
                </Text>
                <VStack className='mainInformationInput_container'>
                    <Text Tag='p' className='title'>
                    Title
                    </Text>
                    <Input
                        type='text'
                        placeholder="Placeholder"
                        className='input'
                        value={useSelector((state: RootState) => state.contestsCreationPage.name)}
                        onChange={(e) => handleNameChange(e)}
                    />
                </VStack>
                <HStack className='categoryInputs_container'>
                    <MainInformationCombobox title='Category' placeholder='Select category' options={categories} width="100%"/>
                    <MainInformationCombobox title='Subcategory' placeholder='Select subcategory' options={subcategories} width="100%"/>
                </HStack>
            </VStack>

            <ImageUpload
                text='Cover image'
                img={coverIMGPlaceholder}
                imgAlt='coverIMGPlaceholder'
            />
            <ImageUpload
                text='Card image'
                img={cardIMGPlaceholder}
                imgAlt='cardIMGPlaceholder'
            />
            <DescriptionInput />

            <VStack className='mainInfoRadioElContainers_container'>
                <MainInfoRadioElContainer
                    text='Type of competition'
                    svg={questionMark}
                    currActive='Open'>
                    <MainInfoRadioEl svg={eye} text='Open' />
                    <MainInfoRadioEl svg={lock} text='Close' />
                </MainInfoRadioElContainer>

                <MainInfoRadioElContainer
                    text='Winner selection type'
                    svg={questionMark}
                    currActive="Creator's decision">
                    <MainInfoRadioEl svg={random} text='Random' />
                    <MainInfoRadioEl svg={heart} text='Viewer voting' />
                    <MainInfoRadioEl
                        svg={creatorsDecision}
                        text="Creator's decision"
                    />
                </MainInfoRadioElContainer>
            </VStack>
        </VStack>
    )
})
