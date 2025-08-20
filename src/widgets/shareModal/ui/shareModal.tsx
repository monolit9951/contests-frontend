import { FC } from "react";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";

import './shareModal.scss'


interface Props {
    text: string
    url: string
}

const ShareModal: FC<Props> = ({text, url}) => {

    const {showAlert, Alert} = useAlert()

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
    }


    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({text, url })
            } catch (err) {
                // ALERT
                showAlert("SHARE ERROR", 'Cannot share')
            }
        } else {
            // ALERT
           showAlert("ERRPR", "Web Share API CANT WORK")
        }
    }

    return(
        <div className="shareModal">

            <div className="shareModal_heading">Share to...</div>

            <ul>
                <li>
                    <div className="shareModal_link_container">
                        {/* какой-то дизайн */}
                        <a href={`https://t.me/share/url?url=${url}&text=${text}`}>Telegram</a>
                    </div>
                </li>
                <li>
                    <div className="shareModal_link_container">
                        {/* какой-то дизайн */}
                        <a href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}>Twitter X</a>
                    </div>
                </li>
                <li>
                    <div className="shareModal_link_container">
                        {/* какой-то дизайн */}
                        <a href={`https://api.whatsapp.com/send?text=${text}%20${url}`}>whatsapp</a>
                    </div>
                </li>
                <li>
                    <div className="shareModal_link_container">
                        {/* какой-то дизайн */}
                        <button type="button" onClick={copyLink}>Copy link</button>
                    </div>
                </li>
                <li>
                    <div className="shareModal_link_container">
                        {/* какой-то дизайн */}
                        <button type="button" onClick={handleWebShare}>More...</button>
                    </div>
                </li>
            </ul>

            <Alert />
        </div>
    )
}

export default ShareModal