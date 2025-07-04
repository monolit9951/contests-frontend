import { FC } from "react";
import { useDispatch } from "react-redux";
import googleSVG from 'shared/assets/icons/google.svg'
import CustomCheckbox from "widgets/customCheckbox";

import { setUser } from "../model/slice/userSlice";

import RegistrationInput from "./components/registrationInput/registrationInput";
import Switcher from "./components/switcher/switcher";

import './registrationModal.scss'
import { useNavigate } from "react-router-dom";

interface RegistrationModalInterface {
    onClose: () => void
}

const RegistrationModal: FC <RegistrationModalInterface> = ({onClose}) => {

    const dispatch = useDispatch()

    const handleStandartAuth = () => {
        dispatch(setUser({
            userName: 'gay',
            userLogin: 'gay',
            userProfileImg: 'gayImg',
            role: 'GAY'
        }))

        // закрыть модалку
        onClose()
    }

    const navigate = useNavigate()

    const handleRegistrationWithGoogle = () => {
        window.open('http://localhost:8080/oauth2/authorization/google', '_blank');
    }

    return(
        <div className="registrationModal">
            <div className="registrationModal_header">
                <div className="registrationModal_header_heading">Welcome, Adventurer!</div>
                <div className="registrationModal_header_desc">Begin your quest by joining our community</div>
            </div>

            <div className="registrationModal_switchMode">
                <Switcher />
            </div>

            <div className="registrationModal_inputs">
                <RegistrationInput type="email" placeholder="Enter your email or username" label="Email or Username"/>
                <RegistrationInput type="password" placeholder="Enter your password" label="Password"/>

                <div className="registrationModal_inputs_special">
                    <CustomCheckbox value="Remember me" checked={false}/>

                    <button type="button">Forgot password?</button>
                </div>
            </div>

            <div className="registrationModal_controls">
                <button type="button" className="registrationModal_countinue" onClick={handleStandartAuth}>Start Your Quest</button>

                <div className="registrationModal_controls_explain">Or continue with</div>
                
                <button className="google_auth" type="button" onClick={handleRegistrationWithGoogle}>
                    <div className="google_auth_container">
                        <img src={googleSVG} alt="Google" />
                        <span>Sign in with google</span>
                    </div>
                </button>

                <div className="registrationModal_controls_explain">Join thousands of adventurers on epic quests!</div>
            </div>
        </div>
    )
}

export default RegistrationModal