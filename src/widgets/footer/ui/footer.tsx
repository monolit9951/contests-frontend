import { Link, useLocation } from 'react-router-dom'
import CreateContestLink from 'shared/assets/controlledSVG/contestCreateLink'
import ContestsLink from 'shared/assets/controlledSVG/contestsLink'
import FeedLink from 'shared/assets/controlledSVG/feedLink'
import ProfileLink from 'shared/assets/controlledSVG/profileLink'

import './footer.scss'

export const Footer = () => {

    const location = useLocation()

    return (
        <footer>
            <ul>
                <li>
                    <Link to ='/feed'>
                        <FeedLink color={(location.pathname === '/feed') ? '#0BA486' : undefined}/>
                        <span style={(location.pathname === '/feed') ? {color: '#0BA486'} : {}}>Feed</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/'>
                        <ContestsLink color={location.pathname === '/contests'|| location.pathname === '/' ? '#0BA486' : undefined}/>
                        <span style={location.pathname === '/contests' || location.pathname === '/'? {color: '#0BA486'} : {}}>Contests</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/contestsCreate'>
                        <CreateContestLink color={location.pathname === '/contestsCreate'? '#0BA486' : undefined}/>
                        <span style={location.pathname === '/contestsCreate'? {color: '#0BA486'} : {}}>Create</span>
                    </Link>
                </li>
                <li>
                    <Link to ='/profile'>
                        <ProfileLink color={location.pathname === '/profile'? '#0BA486' : undefined}/>
                        <span style={location.pathname === '/profile'? {color: '#0BA486'} : {}}>Personal</span>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
