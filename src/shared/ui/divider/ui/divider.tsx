import "./divider.scss";

interface DividerProps {
    marginY: number;
    marginX: number;
}

export const Divider = ({ marginX, marginY }: DividerProps) => {
    return (
        <div className="divider" style={{ margin: `${marginY}px ${marginX}px` }} />
    );
};
