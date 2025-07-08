import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import instance from "shared/api/api";
import googleSVG from 'shared/assets/icons/google.svg'
import CustomCheckbox from "widgets/customCheckbox";

import { userByToken } from "../model/service/registrationModalService";
import { setUser } from "../model/slice/userSlice";

import RegistrationInput from "./components/registrationInput/registrationInput";
import Switcher from "./components/switcher/switcher";

import './registrationModal.scss'

interface RegistrationModalInterface {
    onClose: () => void
    auth?: boolean
}

const RegistrationModal: FC <RegistrationModalInterface> = ({onClose, auth}) => {

    const dispatch = useDispatch()

    const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>('LOGIN')

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [nickname, setNickname] = useState<string>('')
    const [chechPassword, setCheckPassword] = useState<string>('')
    const [nicknameValidation, setNicknameValidation] = useState<boolean>(true)
    const [checkPasswordValidation, setCheckPasswordValidation] = useState<boolean>(true) 

    // validation errors
    const [loginError, setLoginError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    // обычный LogIn
    // НЕ ОБРАБОТАНЫ ОШИБКИ ПАРОЛЯ ИЛИ ЛОГИНА
    const handleStandartAuth = async () => {

        // ошибки пароля или юзернейм
        if(login === '' || password === ''){
            if(login === '' || login.length < 3 || login.length > 20){setLoginError('Login must be 3-20 letters')}
            if(password === ''){setPasswordError('Password must be 3-20 symbols')}
        
            return
        }

        const response = await instance.post('/auth/signin', {login, password})
        const userResponse = await userByToken(response.data.token)

        dispatch(setUser({
            userName: userResponse.name,
            userLogin: userResponse.login,
            userProfileImg: userResponse.profileImg,
            userRole: userResponse.role,
            userId: userResponse.id
        }))
        
        // СОХРАНЕНИЕ ТОКЕНА В ЛОКАЛСТОРЕДЖ
        localStorage.setItem('userToken', response.data.token)
        setLoginError('')
        setPasswordError('')

        onClose()
    }

    // стандартная регистрация
    // НЕ ОБРАБОТАНЫ ОШИБКИ ПАРОЛЯ ИЛИ ЛОГИНА, ТЕСТОВОЕ 
    const handleStandartRegistration = async () =>{

        setLoginError('')
        setPasswordValidation(true)    
        setCheckPasswordValidation(true)
        setNicknameValidation(true)

        // ошибки полей
        if(login === '' || password === '' || nickname === '' || chechPassword === ''){
            if(login === '' || login.length < 3 || login.length > 20){setLoginError('Login must be 3-20 letters')}
            if(password === ''){setPasswordValidation(false)}
            if(nickname === ''){setNicknameValidation(false)}
            if(chechPassword === ''){setCheckPasswordValidation(false)}
        
            return
        }

        // валидация пароля
        if (password !== chechPassword){
            setPasswordValidation(false)
            setCheckPasswordValidation(false)
            return
        }

        // потом поменять роль юзера
        await instance.post('/auth/register', {
            name: nickname,
            login: username,
            password,
            role: 'USER'
        })

        setLogin('')
        setPassword('')
        setAuthType('LOGIN')

        setPasswordValidation(true)
        setUsernameValidation(true)
    }

    // гугл регистрация или лог ин
    const handleRegistrationWithGoogle = () => {
        window.open('http://localhost:8080/oauth2/authorization/google', '_blank');
    }

    // обработчик инпута никнейм
    const handleLoginCallback = (name: string) => {
        setLogin(name)
    }

    // обработчик инпута пассворд
    const handlePasswordCallback = (pass: string) => {
        setPassword(pass)
    }

    // свитчер режима входи и регистрации
    const handleSwitcherCallBack = (mode: 'LOGIN' | 'SIGNUP') => {
        if(mode !== authType){
            setAuthType(mode)

            setNicknameValidation(true)
            setCheckPasswordValidation(true)
            setUsernameValidation(true)
            setPasswordValidation(true)
            setPassword('')
            setNickname('')
            setCheckPassword('')
            setUsername('')
        }
    }

    const handleCheckPasswordCallback = (checkPass: string) => {
        setCheckPassword(checkPass)
    }

    const handleNicknameCallback = (nick: string) => {
        setNickname(nick)
    }

    return(
        <div className="registrationModal">
            <div className="registrationModal_header">
                <div className="registrationModal_header_heading">{auth? 'Authorization Required' : 'Welcome, Adventurer!'}</div>
                <div className="registrationModal_header_desc">Begin your quest by joining our community</div>
            </div>

            <div className="registrationModal_switchMode">
                <Switcher handleSwitcherCallBack = {handleSwitcherCallBack} mode={authType}/>
            </div>

            <div className="registrationModal_inputs">
                <RegistrationInput validationText={loginError} value = {login} type="email" changeCallBack = {handleLoginCallback} placeholder="Enter your email or login" label="Email or Login" />
                {/* {authType === 'SIGNUP' && <RegistrationInput validation={nicknameValidation} value = {nickname} type="text" changeCallBack = {handleNicknameCallback} placeholder="Nickname" label="Nickname" />} */}
                <RegistrationInput validationText={passwordError} value={password} type="password" changeCallBack = {handlePasswordCallback} placeholder="Enter your password" label="Password"/>
                {/* {authType === 'SIGNUP' && <RegistrationInput validation={checkPasswordValidation} value={chechPassword} type="password" changeCallBack = {handleCheckPasswordCallback} placeholder="Confirm your password" label="Confirm Password"/>} */}

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