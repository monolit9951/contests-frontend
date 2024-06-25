import clsx from 'clsx'
import magnifyingGlass from 'shared/assets/icons/magnifyingGlass.svg?react'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'

import './searchbar.scss'

interface SearchbarProps {
    searchData: string
    onChange: (str: string) => void
    onSubmit: () => void
    placeholder: string
    className?: string
}

export const Searchbar = (props: SearchbarProps) => {
    const { searchData, onChange, onSubmit, placeholder, className } = props

    return (
        <div className='searchbar_container'>
            <Icon Svg={magnifyingGlass} clickable onClick={onSubmit} />
            <Input
                type='text'
                value={searchData}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit()
                    }
                }}
                placeholder={placeholder}
                className={clsx('searchbar', className)}
            />
        </div>
    )
}
