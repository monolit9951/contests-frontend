import { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

interface Props {
    data: number[]
}

const SparklineChart: FC<Props> = ({data}) => {
  return (
    <Sparklines 
      data={data} 
      limit={data.length} 
      width={100} 
      height={35} 
      margin={5} 
    >
      <SparklinesLine color="#3ac49f" style={{ strokeLinecap: 'round', strokeWidth: 1 }} />
      <SparklinesReferenceLine 
        type="custom" 
        value={Math.max(...data)} 
        style={{ stroke: '#888', strokeDasharray: '3', strokeWidth: 1, opacity: 0.2 }} 
      />
    </Sparklines>
  );
}

export default SparklineChart;
