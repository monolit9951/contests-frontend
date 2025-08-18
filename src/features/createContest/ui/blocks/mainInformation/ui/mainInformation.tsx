import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import addFileSvg from 'shared/assets/icons/addFile.svg'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import cross from 'shared/assets/icons/X.svg'
import { allowedMediaTypes } from 'shared/helpers/allowedMediaTypes'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'
import { Icon } from 'shared/ui/icon'
import { Combobox, Input, Textarea } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { categories } from '../mockData'

// import { categories, subcategories } from '../mockData'
import { ImageUpload } from './imageUpload'
import { RadioContainer, RadioEl } from './radioContainer'

import './mainInformation.scss'
import { Video } from 'shared/ui/videoPlayer'

interface Props {
    submitError: boolean
}

export const MainInformation = ({ submitError }: Props) => {
    const [quantity, setQuantity] = useState(0)
    const {showAlert, Alert} = useAlert()

    const {
        register,
        control,
        formState: { errors },
        getValues,
        setValue
    } = useFormContext()

    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const [examples, setExamples] = useState<File[]>([])

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragOver(true)
    };

    const handleDragLeave = () => {
        setIsDragOver(false)
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragOver(false)
        const files = Array.from(event.dataTransfer.files)

        if (files[0].type && !allowedMediaTypes.includes(files[0].type)){
            
            showAlert('ERROR', 'Wrong file type')
            return
        }
        
        setExamples(prev => [...prev, ...files]);
    };

    const handleDeleteExample = (item: File) => {
        setExamples(examples.filter(example => example !== item))
    }

const handleUploadExampleByInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files){
        return
    }

    if (!allowedMediaTypes.includes(event.target.files[0].type)){
        showAlert('ERROR', 'Wrong file type')
            return
    }

    const files = Array.from(event.target.files)
        .filter(file => file.type.startsWith('image/'))

    setExamples(prev => [...prev, ...files])

    event.target.value = ''
}

    useEffect(() => {
        setValue('exampleMedia', examples)
    }, [examples])

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

            <ImageUpload text='Cover image' extra='1704/390' hint = 'Image which you will see like a banner for your contest.'/>
            <ImageUpload text='Card image' extra='376/211'hint = 'Image which will be used in all contest preview.'/>
            
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

                <div className="descriptionInput_heading">Description</div>

                <div className={`descriptionInput_textarea ${isDragOver ? 'drag-over' : ''}`}
                    onDragOver= {handleDragOver}
                    onDragEnter={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
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
                    <div className="descriptionInput_addFile">
                        <div className="descriptionInput_addFile_container">
                            <img src={addFileSvg} alt="addFile" />
                            <input type="file" onChange={handleUploadExampleByInput} accept="image/*"/>
                        </div>
                    </div>
                </div>
                
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

                {examples.length > 0 && 
                <>
                    {/* <span className='descriptionInput_heading'>EXAMPLES</span> */}
                    <div className="descriptionInput_mediaList">
                        {examples.map((item: File, index: number) => (
                            <div className="exapmleItem" key={index}>
                                <div className="exapmleItem_container">
                                    {item.type.startsWith("image/") && <img src={URL.createObjectURL(item)} alt="example"/>}
                                    {item.type.startsWith("video/") && <Video url={URL.createObjectURL(item)} light/>}
                                </div>
                                <button className="exapmleItem_cross" type='button' onClick={() => handleDeleteExample(item)}>
                                    <img src={cross} alt="cross" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>}
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

            <Alert />
        </VStack>
    )
}
