import React from "react";
import clsx from "clsx";
import {useTheme} from "entities/theme";
import avatar from "shared/assets/img/userIMG.jpg";
import {Image} from "shared/ui/image";
import {HStack} from "shared/ui/stack";

export const NameRenderer: React.FC<{ value: string }> = ({ value }) => {
    const { theme } = useTheme();

    return (
        <HStack className={clsx(theme, 'name-cell')}>
            <Image src={avatar} alt='avatar' className='avatar-img' />
            {value}
        </HStack>
    );
};