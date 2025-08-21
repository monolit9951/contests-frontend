import { Link } from 'react-router-dom'
import { Text } from 'shared/ui/text'

import './logo.scss'

export const Logo = () => {
    return (
        <Link to='/' className='logo-link'>
            <Text Tag='h2' size='xl'>
                DareBay
            </Text>
        </Link>
    )
}
