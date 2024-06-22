import { useDispatch, useSelector } from "react-redux"
import { Category, SubCategory } from "entities/contest/model/types"
import {setContestCategory, setContestSubcategory} from "pages/contestsCreationPage/model/services"
import { Combobox } from "shared/ui/input"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./mainInformationCombobox.scss"

interface MainInformationComboboxProps{
    title: string
    placeholder: string
    options: { value: string; label: string }[]
    width?: string | number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const MainInformationCombobox = ({title, placeholder, options, width, onChange}: MainInformationComboboxProps) => {
    const dispatch: AppDispatch = useDispatch();
    const value = useSelector((state: RootState) =>
        title.toLowerCase() === 'category'
            ? state.contestsCreationPage.category
            : state.contestsCreationPage.subcategory
    );

    const ComboboxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as Category | SubCategory;
        if (title.toLowerCase() === 'category') {
            dispatch(setContestCategory(selectedValue as Category));
        } else {
            dispatch(setContestSubcategory(selectedValue as SubCategory));
        }
    };
   

    return (
        <VStack className='mainInformationInput_container'>
        <Text Tag='p' className='title'>
        {title}
        </Text>
        <Combobox
            options={options}
            placeholder={placeholder}
            className='input'
            width={width}
            value={value}
            // onChange={(e) => ComboboxChange(e)}
            // onChange={(e) => onChange(e)}
        />
    </VStack>
    )
}