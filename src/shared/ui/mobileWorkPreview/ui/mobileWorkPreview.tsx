import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWorkById } from 'entities/work/model/services/workServices'
import { useGetRequest } from 'shared/lib/hooks/useGetRequest'
import { WorkPreviewContest } from 'shared/ui/workPreviewContest'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import MobileWorkTopPanel from './components/mobileWorkTopPanel/mobileWorkTopPanel'

import './mobileWorkPreview.scss'

const MobileWorkPreview = () => {

    const {data: work, isLoaded: workLoaded} = useGetRequest({fetchFunc: () => getWorkById('68ac653d4437153ad8d08a7f'), enabled: true, key: []})

    console.log(work)

    const longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const [moreDescription, setMoreDescription] = useState<boolean>(false)

    const handleMore = () => {
        setMoreDescription(!moreDescription)
    }

    return( 
        <div className="mobileWorkPreview">
            <div className="mobileWorkPreview_container">
                {workLoaded && work && work.media.length > 0 && <img src={work.media[0].mediaLink} alt="media" />}

                <MobileWorkTopPanel />

                {workLoaded && work && <div className="mobileWorkPreview_description">
                    <Link to='/'><UserProfileData user = {work.user}/></Link>

                    <div className="mobileWorkPreview_description_container">
                        <div className={`mobileWorkPreview_description_text ${!moreDescription && 'short'}`}>
                            {longDescription}
                        </div>

                        <button type='button' onClick={handleMore}>{moreDescription? 'Less' : 'More'}</button>
                    </div>

                    <Link to='/'><WorkPreviewContest /></Link>
                </div>}
            </div>
        </div>
    )
}

export default MobileWorkPreview