import React, { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

import './flex.scss';

interface FlexProps {
    children: ReactNode;
    className?: string;
    clickFunction?: () => void;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const { children, className, clickFunction } = props;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (clickFunction && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            clickFunction();
        }
    };

    return (
        <div
            ref={ref}
            className={clsx('flex', className)}
            {...(clickFunction && {
                role: 'button',
                tabIndex: 0,
                onClick: clickFunction,
                onKeyDown: handleKeyDown,
            })}
        >
            {children}
        </div>
    );
});

export default Flex;
