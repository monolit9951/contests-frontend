// import clsx from 'clsx'  // removed: unused

import './footer.scss'
import { Link, useLocation } from 'react-router-dom'

import FeedLink from 'shared/assets/controlledSVG/feedLink'
import CreateContestLink from 'shared/assets/controlledSVG/contestCreateLink'
import ProfileLink from 'shared/assets/controlledSVG/profileLink'
import ContestsLink from 'shared/assets/controlledSVG/contestsLink'

const ACTIVE = '#0BA486'

export const Footer = () => {
    const { pathname } = useLocation()
    const isFeed = pathname === '/' || pathname === '/feed'

    return (
        <footer>
            <ul>
                <li>
                    <Link to="/">
                        <FeedLink color={isFeed ? ACTIVE : undefined} />
                        <span style={isFeed ? { color: ACTIVE } : undefined}>Feed</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contests">
                        <ContestsLink color={pathname === '/contests' ? ACTIVE : undefined} />
                        <span style={pathname === '/contests' ? { color: ACTIVE } : undefined}>Contests</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contestsCreate">
                        <CreateContestLink color={pathname === '/contestsCreate' ? ACTIVE : undefined} />
                        <span style={pathname === '/contestsCreate' ? { color: ACTIVE } : undefined}>Create</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <ProfileLink color={pathname === '/profile' ? ACTIVE : undefined} />
                        <span style={pathname === '/profile' ? { color: ACTIVE } : undefined}>Personal</span>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
