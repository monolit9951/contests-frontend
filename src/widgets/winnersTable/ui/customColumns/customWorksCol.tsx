import React from "react";
import clsx from "clsx";
import {useTheme} from "entities/theme";
import arrow from 'shared/assets/icons/arrowUpRight.svg?react'
import {Button} from "shared/ui/button";
import {Icon} from "shared/ui/icon";

export const WorkLinkRenderer: React.FC<{ value: string }> = ({ value }) => {
    const { theme } = useTheme()
    const handleClick = () => {
        window.open(value, '_blank')
    }

    return (
        <Button
            variant='secondary'
            onClick={handleClick}
            className={clsx(theme, 'work-link')}>
            View Work
            <Icon Svg={arrow} width={20}/>
        </Button>
    )
}