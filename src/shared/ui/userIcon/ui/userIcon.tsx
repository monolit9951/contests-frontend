import userImg from "../../../assets/img/userIMG.jpg"

import "./userIcon.scss"

export const UserIcon = () => {
    return(
        <div className="userImg_container">
            <img src={userImg} alt="userIMG" />
        </div>
    )
}