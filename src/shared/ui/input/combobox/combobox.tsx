import { useState } from 'react'
import Select, {
    components,
    DropdownIndicatorProps,
    GroupBase,
    Props,
} from 'react-select'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import CaretDown from 'shared/assets/icons/caretDown.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './combobox.scss'

type ICombobox<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
    label?: string
    error?: string
    info?: string
    options: { value: string; label: string }[]
    wrapperClassName?: string
    className?: string
}

export default function Combobox<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ICombobox<Option, IsMulti, Group>) {
    const {
        name,
        label,
        error,
        info,
        value,
        options,
        placeholder,
        onChange,
        onBlur,
        wrapperClassName,
        className,
    } = props

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const styles = {
        control: (provided: any) => ({
            ...provided,
            minWidth: 164,
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            transition: 'transform 0.2s ease',
            transform: menuIsOpen ? 'rotate(180deg)' : null,
        }),
    }

    // eslint-disable-next-line react/no-unstable-nested-components
    const DropdownIndicator = (
        propsDI: DropdownIndicatorProps<Option, IsMulti, Group>
    ) => (
        <components.DropdownIndicator {...propsDI}>
            <CaretDown />
        </components.DropdownIndicator>
    )

    return (
        <VStack className={clsx('input-wrapper', wrapperClassName)}>
            {label && (
                <label className='input-wrapper__label' htmlFor={name}>
                    {label}
                </label>
            )}

            <Select
                options={options}
                isSearchable={false}
                components={{ DropdownIndicator }}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                styles={styles}
                menuIsOpen={menuIsOpen}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                className={clsx(error && 'error', className)}
                classNamePrefix='Select'
            />
            {info && (
                <HStack className='input-wrapper__info'>
                    <Icon Svg={infoIcon} />
                    <Text Tag='span'>{info}</Text>
                </HStack>
            )}
            {error && (
                <HStack className='input-wrapper__error'>
                    <Icon Svg={alertIcon} />
                    <Text Tag='span'>{error}</Text>
                </HStack>
            )}
        </VStack>
    )
}
