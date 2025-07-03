import { FC } from "react";
import './registrationModal.scss'
import Switcher from "./components/switcher/switcher";
import RegistrationInput from "./components/registrationInput/registrationInput";
import CustomCheckbox from "widgets/customCheckbox";
import googleSVG from 'shared/assets/icons/google.svg'



const RegistrationModal: FC = () => {
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
                <button type="button" className="registrationModal_countinue">Start Your Quest</button>

                <div className="registrationModal_controls_explain">Or continue with</div>
                
                <button className="google_auth" type="button">
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