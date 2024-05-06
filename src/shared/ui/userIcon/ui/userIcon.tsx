import { Image } from "shared/ui/image"

import userImg from "../../../assets/img/userIMG.jpg"

import "./userIcon.scss"

export const UserIcon = () => {
    return(
        <div className="userImg_container">
            <Image src={userImg} alt="userIMG" />
        </div>
    )
}