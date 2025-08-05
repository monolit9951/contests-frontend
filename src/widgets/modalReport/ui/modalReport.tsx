import { ChangeEvent, FC, useState } from "react";
import instance from "shared/api/api";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { Button } from "shared/ui/button";
import { Textarea } from "shared/ui/input";

import './modalReport.scss'


interface Props {
    targetId: string,
    targetType: "CONTEST" | "WORK" | "COMMENT" | "MEDIA"
    onClose?: () => void
}

const ModalReport: FC<Props> = ({targetId, targetType, onClose}) => {

    const {showAlert, Alert} = useAlert()
    const [reportText, setReportText] = useState<string>('')
    const token = localStorage.getItem('userToken')

    const handleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReportText(event.target.value)
    }


    const handleReport = async () =>{

        try {
            await instance.post('/reports', {targetType, targetId, reason: reportText}, {headers: {Authorization: `Bearer ${token}`}})
            if (onClose){
                onClose()
            }
        } catch (error) {
            showAlert("ERROR MESSAGE NOT DESDRUCTURIZED")
        }
    }

    return(
        <div className="modalReport">
            <div className="modalReport_heading">Report</div>
            <Textarea placeholder="I dont like this content because..." onChange={handleTextarea} name="report"/>
            <div className="modalReport_button">
                <Button type="button" variant="primary" onClick={handleReport}>Report</Button>
            </div>

            <Alert />
        </div>
    )
}

export default ModalReport