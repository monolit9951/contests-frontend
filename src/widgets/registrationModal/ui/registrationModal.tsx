import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import googleSVG from 'shared/assets/icons/google.svg'
import CustomCheckbox from "widgets/customCheckbox";

import { setUser } from "../model/slice/userSlice";

import RegistrationInput from "./components/registrationInput/registrationInput";
import Switcher from "./components/switcher/switcher";

import './registrationModal.scss'
import { useNavigate } from "react-router-dom";
import instance from "shared/api/api";
import { userByToken } from "../model/service/registrationModalService";

interface RegistrationModalInterface {
    onClose: () => void
}

const RegistrationModal: FC <RegistrationModalInterface> = ({onClose}) => {

    const dispatch = useDispatch()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>('LOGIN')

    // обычный LogIn
    // НЕ ОБРАБОТАНЫ ОШИБКИ ПАРОЛЯ ИЛИ ЛОГИНА
    const handleStandartAuth = async () => {
        
        const response = await instance.post('/auth/signin', {login: username, password: password})
        const userResponse = await userByToken(response.data.token)

        dispatch(setUser({
            userName: userResponse.name,
            userLogin: userResponse.login,
            userProfileImg: userResponse.profileImg,
            userRole: userResponse.role,
            userId: userResponse.id
        }))

        onClose()
    }

    // стандартная регистрация
    const handleStandartRegistration = async () =>{
        console.log('STANDART REGISTRATION')

        // потом поменять роль юзера
        const result = await instance.post('/auth/register', {
            name: username,
            login: username,
            password: password,
            role: 'USER'
        })

        console.log(result)
        setUsername('')
        setPassword('')
        setAuthType('LOGIN')

        // свич на лог ин и введение данных заново
    }

    const navigate = useNavigate()

    // гугл регистрация или лог ин
    const handleRegistrationWithGoogle = () => {
        window.open('http://localhost:8080/oauth2/authorization/google', '_blank');
    }

    // обработчик инпута никнейм
    const handleUsernameCallback = (name: string) => {
        setUsername(name)
    }

    // обработчик инпута пассворд
    const handlePasswordCallback = (pass: string) => {
        setPassword(pass)
    }

    const handleSwitcherCallBack = (mode: 'LOGIN' | 'SIGNUP') => {
        setAuthType(mode)
    }

    return(
        <div className="registrationModal">
            <div className="registrationModal_header">
                <div className="registrationModal_header_heading">Welcome, Adventurer!</div>
                <div className="registrationModal_header_desc">Begin your quest by joining our community</div>
            </div>

            <div className="registrationModal_switchMode">
                <Switcher handleSwitcherCallBack = {handleSwitcherCallBack} mode={authType}/>
            </div>

            <div className="registrationModal_inputs">
                <RegistrationInput value = {username} type="email" changeCallBack = {handleUsernameCallback} placeholder="Enter your email or username" label="Email or Username" />
                <RegistrationInput value={password} type="password" changeCallBack = {handlePasswordCallback} placeholder="Enter your password" label="Password"/>

                <div className="registrationModal_inputs_special">
                    <CustomCheckbox value="Remember me" checked={false}/>

                    <button type="button">Forgot password?</button>
                </div>
            </div>

            <div className="registrationModal_controls">
                <button type="button" className="registrationModal_countinue" onClick={authType === 'LOGIN' ? handleStandartAuth : handleStandartRegistration}>Start Your Quest</button>

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