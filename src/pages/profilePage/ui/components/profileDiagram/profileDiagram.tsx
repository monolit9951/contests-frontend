import { FC } from "react";
import { PieChart } from "react-minimal-pie-chart";

import './profileDiagram.scss'

interface Props {
    statistics: any
}

const ProfileDiagram: FC<Props> = ({statistics}) => {
    return(
        <div className="profileDiagram">
            
            <div className="profileDiagram_diagram">

                {/* БЕЗ ФОНА = ПРОМЕЖУТОК */}
                <PieChart
                    data={[
                    { value: 93, color: "#6C63FF" }, // Фиолетовый сегмент
                    { value: 10, color: "transparent" },
                    { value: 33, color: "#FFD23F" }, // Жёлтый сегмент
                    { value: 10, color: "transparent" },
                    { value: 33, color: "#06D6A0" }, // Зелёный сегмент
                    { value: 10, color: "transparent" }
                    ]}
                    lineWidth={15}
                    rounded
                    startAngle={-120}
                />
                <div
                    style={{
                    position: "absolute",
                    textAlign: "center",
                    color: "#06D6A0",
                    fontSize: "28px",
                    fontWeight: "bold"
                    }}
                >
                    233
                    <div style={{ fontSize: "14px", color: "#ccc", fontWeight: "normal" }}>
                    All contests
                    </div>
                </div>
            </div>

            <ul className="profileDiagram_legend">
                <li>
                    <div className="profileDiagram_legend_dot" />
                    <span>Contest Created</span>
                    <span>2</span>
                </li>

                <li>
                    <div className="profileDiagram_legend_dot green" />
                    <span>Contest Created</span>
                    <span>2</span>
                </li>

                <li>
                    <div className="profileDiagram_legend_dot yellow" />
                    <span>Contest Created</span>
                    <span>200</span>
                </li>
            </ul>

        </div>
    )
}

export default ProfileDiagram