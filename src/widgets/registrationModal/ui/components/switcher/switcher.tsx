import { FC } from "react";

import './switcher.scss'

interface SwitcherInterface {
    handleSwitcherCallBack: (value: 'LOGIN' | 'SIGNUP') => void;
    mode: 'LOGIN' | 'SIGNUP'; 
}

const Switcher: FC<SwitcherInterface> = ({ handleSwitcherCallBack, mode }) => {
    const handleLogIn = () => {
        handleSwitcherCallBack('LOGIN');
    };

    const handleSignUp = () => {
        handleSwitcherCallBack('SIGNUP');
    };

    return (
        <div className="switcher">
            <button type="button" className={mode === 'LOGIN' ? "isMode" : ""} onClick={handleLogIn}>Log In</button>
            <button type="button" className={mode === 'SIGNUP' ? "isMode" : ""} onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Switcher;
