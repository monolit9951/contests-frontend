import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import { Icon } from 'shared/ui/icon'
import { Combobox, Input, Textarea } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { categories } from '../mockData'

// import { categories, subcategories } from '../mockData'
import { ImageUpload } from './imageUpload'
import { RadioContainer, RadioEl } from './radioContainer'

import './mainInformation.scss'
import { GalleryUpload } from '../../galleryUpload'

interface Props {
    submitError: boolean
}

export const MainInformation = ({ submitError }: Props) => {
    const [quantity, setQuantity] = useState(0)

    const {
        register,
        control,
        formState: { errors },
        getValues,
    } = useFormContext()

    return (
        <VStack className='mainInformation_container'>
            <VStack className='mainInformation_title_categories_container'>
                <Text Tag='h2' className='mainInformation_container_header'>
                    Main information
                </Text>

                <Input
                    label='Title'
                    type='text'
                    placeholder='Enter contest name'
                    {...register('name', {
                        required: 'Contest name is required',
                        minLength: {
                            value: 4,
                            message: 'Enter minimum of 4 symbols',
                        },
                    })}
                    autoComplete='off'
                    maxLength={100}
                    error={errors.name && (errors.name.message as string)}
                />

                <HStack className='categoryInputs_container'>
                    <Controller
                        name='category'
                        control={control}
                        rules={{ required: 'Select category' }}
                        render={({ field }) => (
                            <Combobox
                                options={categories}
                                name={field.name}
                                value={categories.find(
                                    (c) => c.value === field.value
                                )}
                                onChange={(val) => field.onChange(val?.value)}
                                label='Category'
                                placeholder='Select category'
                                error={
                                    errors.category &&
                                    (errors.category.message as string)
                                }
                            />
                        )}
                    />
                    {/* <Controller
                        name='subcategory'
                        control={control}
                        rules={{ required: 'Select subcategory' }}
                        render={({ field }) => (
                            <Combobox
                                options={subcategories}
                                name={field.name}
                                value={subcategories.find(
                                    (c) => c.value === field.value
                                )}
                                onChange={(val) => field.onChange(val?.value)}
                                label='Subcategory'
                                placeholder='Select subcategory'
                                error={
                                    errors.subcategory &&
                                    (errors.subcategory.message as string)
                                }
                            />
                        )}
                    /> */}
                </HStack>
            </VStack>

            <ImageUpload text='Cover image' extra='1704/390'/>
            <ImageUpload text='Card image' extra='376/211'/>
            
            {submitError &&
                (!getValues('backgroundImage') ||
                    !getValues('previewImage')) && (
                    <HStack className='input-error-container'>
                        <Icon Svg={alertIcon} />
                        <Text Tag='p'>Images are required</Text>
                    </HStack>
                )}


            {/* Добавть инпут во весь размер текстареа */}
            <VStack className='descriptionInput_container'>


                <Textarea
                    label='Description'
                    className={clsx(
                        'description_placeholder',
                        errors.description && quantity < 40 && 'error'
                    )}
                    placeholder='Write more information...'
                    {...register('description', {
                        required: 'Desciption is required',
                        minLength: 40,
                        onChange: (e) => {
                            setQuantity(e.target.value.length)
                        },
                    })}
                    maxLength={3000}
                    error={
                        errors.description &&
                        (errors.description.message as string)
                    }
                />

                <GalleryUpload />
                <HStack className='description_requirements'>
                    <Text
                        Tag='p'
                        className={clsx(
                            errors.description && quantity < 40 && 'error'
                        )}>
                        Please enter at least 40 characters
                    </Text>
                    <Text Tag='p'>{quantity}/3000</Text>
                </HStack>
            </VStack>

            <VStack className='mainInfoRadioElContainers_container'>
                {/* <RadioContainer text='Type of competition' currActive='Open'>
                    <RadioEl text='Open' />
                    <RadioEl text='Close' />
                </RadioContainer> */}

                <RadioContainer
                    text='Winner selection type'
                    currActive='Random'>
                    <RadioEl text='Random' />
                    {/* <RadioEl text='Viewer voting' /> */}
                    <RadioEl text="Creator's decision" />
                </RadioContainer>
            </VStack>
        </VStack>
    )
}
