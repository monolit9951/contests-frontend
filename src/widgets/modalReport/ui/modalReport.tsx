import { FC } from "react";
import './modalReport.scss'
import { Button } from "shared/ui/button";
import { Textarea } from "shared/ui/input";


interface Props {
    targetId: string,
    targetType: "CONTEST" | "WORK" | "COMMENT" | "MEDIA"
}

const ModalReport: FC<Props> = ({targetId, targetType}) => {
    return(
        <div className="modalReport">
            <div className="modalReport_heading">Report</div>
            <Textarea placeholder="I dont like this content because..."/>
            <div className="modalReport_button">
                <Button type="button" variant="primary">Report</Button>
            </div>
        </div>
    )
}

export default ModalReport