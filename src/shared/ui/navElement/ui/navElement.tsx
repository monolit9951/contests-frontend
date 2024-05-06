import { NavLink, useLocation } from 'react-router-dom';
import { Text } from 'shared/ui/text';

import { Icon } from '../../icon';

import './navElement.scss';

interface NavElementProps {
    svgSrc: React.FC<React.SVGProps<SVGSVGElement>> | string;
    svgFilledSrc:  React.FC<React.SVGProps<SVGSVGElement>> | string;
    text: string;
    route: string;
}

export const NavElement = ({ svgSrc, svgFilledSrc, text, route }: NavElementProps) => {
    const currRoute = useLocation();
    const linkClass = `${currRoute.pathname === route ? "active_navlink" : ""} navElement`
    return (
        <NavLink to={route} className={linkClass}>
            <Icon Svg={svgSrc} width={32} height={32} className='svg_main'/>
            <Icon Svg={svgFilledSrc} width={32} height={32} className='svg_filled'/>
            <Text Tag='p'>{text}</Text>
        </NavLink>
    );
};
