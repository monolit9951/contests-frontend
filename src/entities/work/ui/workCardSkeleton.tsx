import Skeleton from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonWrapper = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 10000,
        minWidth: 250,
        paddingTop: `${(660 / 458) * 100}%`, // высота в процентах от ширины (aspect ratio)
      }}
    >
      <Skeleton
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 24,
        }}
      />
    </div>
  );
};

export default SkeletonWrapper;
