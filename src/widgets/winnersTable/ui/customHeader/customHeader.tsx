import React from 'react';
import arrow from 'shared/assets/icons/caretUpDown.svg?react';
import { Button } from "shared/ui/button";
import { Icon } from 'shared/ui/icon';

interface CustomHeaderProps {
    displayName: string;
    enableSorting: boolean;
    sort: string | null;
    setSort: (sort: string) => void;
}

export const CustomHeaderComponent: React.FC<CustomHeaderProps> = ({ displayName, enableSorting, sort, setSort }) => {
    const handleSort = () => {
        if (!enableSorting) return;
        const nextSort = sort === 'asc' ? 'desc' : 'asc';
        setSort(nextSort);
    };

    return (
        <Button variant='primary' className="custom-header-container" onClick={handleSort}>
            {displayName}
            {enableSorting && <Icon Svg={arrow} width={16} height={16} className="header-icon" />}
            {sort === 'asc' && ' 🔼'}
            {sort === 'desc' && ' 🔽'}
        </Button>
    );
};
