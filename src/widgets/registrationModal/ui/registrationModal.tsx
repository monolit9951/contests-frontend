import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import instance from "shared/api/api";
import googleSVG from 'shared/assets/icons/google.svg'
import cross from 'shared/assets/icons/X.svg'
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
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
    const [checkPassword, setCheckPassword] = useState<string>('')

    // validation errors
    const [loginError, setLoginError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [checkPasswordError, setCheckPasswordError] = useState<string>('')
    const [nicknameError, setNicknameError] = useState<string>('')
    const {showAlert, Alert} = useAlert()
    
    useEffect(() => {
        localStorage.removeItem('rememberMe')
    }, [])
    
    
    // обычный LogIn
    // НЕ ОБРАБОТАНЫ ОШИБКИ ПАРОЛЯ ИЛИ ЛОГИНА
    const handleStandartAuth = async () => {


        // ошибки пароля или юзернейм
        if(login === '' || password === ''){
            if(login === '' || login.length < 3 || login.length > 20){setLoginError('Login must be 3-20 letters')}
            if(password === '' || password.length < 3 || password.length > 20){setPasswordError('Password must be 3-20 symbols')}
        
            return
        }
        
        try{
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
        } catch(error) {
            if (error){
                setLoginError('Invalid login')
                setPasswordError("Invalid password")
            }
        }

    }

    // стандартная регистрация
    const handleStandartRegistration = async () =>{

        setLoginError('')
        setPasswordError('')    
        setCheckPasswordError('')
        setNicknameError('')

        // ошибки полей
        if(login === '' || password === '' || nickname === '' || checkPassword === ''){
            if(login === '' || login.length < 3 || login.length > 20){setLoginError('Login must be 3-20 letters')}
            if(password === '' || password.length < 3 || password.length > 20){setPasswordError('Password must be 3-20 symbols')}
            if(nickname === '' || nickname.length < 3 || nickname.length > 100){setNicknameError('Nickname must be 3-100 letters')}
            if(checkPassword === '' || checkPassword.length < 3 || checkPassword.length > 20){setCheckPasswordError('Password must be 3-20 symbols')}
        
            return
        }

        // валидация пароля
        if (password !== checkPassword){
            setCheckPasswordError("Passwords do not match")
            setPasswordError("Passwords do not match")
            return
        }
        try{
            // потом поменять роль юзера
            await instance.post('/auth/register', {
                email: login,
                name: nickname,
                password,
                role: 'USER',
                confirmPassword: checkPassword
            })

            setLogin('')
            setPassword('')
            setAuthType('LOGIN')

            setPasswordError('')
            setNicknameError('')
        } catch (error){
            if (axios.isAxiosError(error)) {
                // console.log(error.response?.data)
                showAlert('TEST', 'F12 -> CONSOLE TO SEE ERROR');
            }
        }
    }

    // ENV

    // гугл регистрация или лог ин
    const handleRegistrationWithGoogle = () => {
        window.open('https://darebay.com/oauth2/authorization/google', '_self');
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

            setLoginError('')
            setPasswordError('')    
            setCheckPasswordError('')
            setNicknameError('')
            setPassword('')
            setNickname('')
            setCheckPassword('')
            setNickname('')
        }
    }

    const handleCheckPasswordCallback = (checkPass: string) => {
        setCheckPassword(checkPass)
    }

    const handleNicknameCallback = (nick: string) => {
        setNickname(nick)
    }

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.checked){
            localStorage.setItem('rememberMe', 'true')
        } else {
            localStorage.removeItem('rememberMe')
        }
    }

    return(
        <div className="registrationModal">

            <div className="registrationModal_container">
                <div className="registrationModal_header">
                    <div className="registrationModal_header_heading">{auth? 'Authorization Required' : 'Welcome, Adventurer!'}</div>
                    <div className="registrationModal_header_desc">Begin your quest by joining our community</div>
                </div>

                <div className="registrationModal_switchMode">
                    <Switcher handleSwitcherCallBack = {handleSwitcherCallBack} mode={authType}/>
                </div>

                <div className="registrationModal_inputs">
                    <RegistrationInput validationText={loginError} value = {login} type="email" changeCallBack = {handleLoginCallback} placeholder="Enter your email" label="Email" />
                    {authType === 'SIGNUP' && <RegistrationInput validationText={nicknameError} value = {nickname} type="text" changeCallBack = {handleNicknameCallback} placeholder="Enter your username" label="Username" />}
                    <RegistrationInput validationText={passwordError} value={password} type="password" changeCallBack = {handlePasswordCallback} placeholder="Enter your password" label="Password"/>
                    {authType === 'SIGNUP' && <RegistrationInput validationText={checkPasswordError} value={checkPassword} type="password" changeCallBack = {handleCheckPasswordCallback} placeholder="Confirm your password" label="Confirm Password"/>}

                    <div className="registrationModal_inputs_special">
                        <CustomCheckbox value="Remember me" checked={false} handleCheckbox = {handleCheckbox}/>

                        <button type="button">Forgot password?</button>
                    </div>
                </div>

                <div className="registrationModal_controls">
                    <button type="button" className="registrationModal_countinue" onClick={authType === 'LOGIN' ? handleStandartAuth : handleStandartRegistration}>{authType === 'LOGIN'? 'Log in' : 'Registration'}</button>

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

            <button type="button" onClick={onClose}><img src={cross} alt="X" /></button>

            <Alert />
        </div>
    )
}

export default RegistrationModal