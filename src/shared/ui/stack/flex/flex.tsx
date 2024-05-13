import { forwardRef, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

import './flex.scss';

interface FlexProps {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void; // Add onClick prop
}

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const { children, className, onClick } = props;

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && onClick) {
            onClick(event as unknown as MouseEvent<HTMLDivElement>);
        }
    };

    return (
        <div
            ref={ref}
            className={clsx('flex', className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Add tabIndex to make the div focusable
            role="button" // Add role for accessibility
        >
            {children}
        </div>
    );
});

export default Flex;
