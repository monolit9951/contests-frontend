import { NavLink } from 'react-router-dom';

import { Icon } from '../../icon';

import './navElement.scss';

interface NavElementProps {
    svgSrc: React.FC<React.SVGProps<SVGSVGElement>> | string;
    svgFilledSrc:  React.FC<React.SVGProps<SVGSVGElement>> | string;
    text: string;
    route: string;
}

export const NavElement = ({ svgSrc, svgFilledSrc, text, route }: NavElementProps) => {
    return (
        <NavLink to={route} className='navElement'>
            <Icon Svg={svgSrc} width={32} height={32} className='svg_main'/>
            <Icon Svg={svgFilledSrc} width={32} height={32} className='svg_filled'/>
            <p>{text}</p>
        </NavLink>
    );
};
