import { Link, useLocation } from 'react-router-dom'
import CreateContestLink from 'shared/assets/controlledSVG/contestCreateLink'
import ContestsLink from 'shared/assets/controlledSVG/contestsLink'
import FeedLink from 'shared/assets/controlledSVG/feedLink'
import ProfileLink from 'shared/assets/controlledSVG/profileLink'

import './footer.scss'

export const Footer = () => {

    const location = useLocation()

    console.log(location.pathname)

    return (
        <footer>
            <ul>
                <li>
                    <Link to ='/'>
                        <FeedLink color={location.pathname === '/feed' || location.pathname === '/' && '#0BA486'}/>
                        <span style={location.pathname === '/feed' || location.pathname === '/'? {color: '#0BA486'} : {}}>Feed</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/contests'>
                        <ContestsLink color={location.pathname === '/contests' && '#0BA486'}/>
                        <span style={location.pathname === '/contests'? {color: '#0BA486'} : {}}>Contests</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/contestsCreate'>
                        <CreateContestLink color={location.pathname === '/contestsCreate' && '#0BA486'}/>
                        <span style={location.pathname === '/contestsCreate'? {color: '#0BA486'} : {}}>Create</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/profile'>
                        <ProfileLink color={location.pathname === '/profile' && '#0BA486'}/>
                        <span style={location.pathname === '/profile'? {color: '#0BA486'} : {}}>Personal</span>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
