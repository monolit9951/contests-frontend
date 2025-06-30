import { FC, useState } from "react";
import './switcher.scss'


// в пропсы передать коллбек с выбором
const Switcher: FC = () =>{

    const [mode, setMode] = useState<string>('LOG IN')

    const handleLogIn = () => {
        setMode('LOG IN')

        // callback
    }

    const handleSignUp = () => {
        setMode('SIGN UP')

        // callback
    }

    return(
        <div className="switcher">
            <button type="button" className={mode === 'LOG IN'? "isMode" : ""} onClick={handleLogIn}>Log In</button>
            <button type="button" className={mode === 'SIGN UP'? "isMode" : ""} onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default Switcher