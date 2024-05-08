import { FilterController } from 'features/filterContests'

import './homePage.scss'

export const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FilterController />
        </div>
    )
}
