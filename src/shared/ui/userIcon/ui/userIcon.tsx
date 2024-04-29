import "./userIcon.scss"
import userImg from "../../../assets/img/userIMG.jpg"

export const UserIcon = () => {
    return(
        <div className="userImg_container">
            <img src={userImg} alt="userIMG" />
        </div>
    )
}