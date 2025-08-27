import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import './feedWorkSkeleton.scss'

const FeedWorkSkeleton = () => {
  return (
    <div className="feedWorkSkeleton">
      <div className="feedWorkSkeleton_profile">
        <Skeleton width={50} height={50} borderRadius={25} />

        <div className="feedWorkSkeleton_profile_info">
          <Skeleton width={200} height={23} />
          <Skeleton width={100} height={23} />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 10000,
          minWidth: 250,
          paddingTop: `${(612 / 455) * 100}%`, // соотношение 455:612
        }}
      >
        <Skeleton
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 24,
          }}
        />
      </div>
    </div>
  );
};

export default FeedWorkSkeleton;
