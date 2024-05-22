import userImg from 'shared/assets/img/userIMG.jpg'
import { Image } from 'shared/ui/image'

import './userIcon.scss'

export const UserIcon = () => {
    return (
        <div className='userImg_container'>
            <Image src={userImg} alt='userIMG' round />
        </div>
    )
}
