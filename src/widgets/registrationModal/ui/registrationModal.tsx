import { FC } from "react";
import './registrationModal.scss'
import Switcher from "./components/switcher/switcher";
import RegistrationInput from "./components/registrationInput/registrationInput";
import CustomCheckbox from "widgets/customCheckbox";

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
        </div>
    )
}

export default RegistrationModal