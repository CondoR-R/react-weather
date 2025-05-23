import type React from "react";
import ContentLoader from "react-content-loader";

interface WeeklyForecastSkeletonProps {
  className: string;
}

const WeeklyForecastSkeleton: React.FC<WeeklyForecastSkeletonProps> = ({
  className,
}) => (
  <ContentLoader
    className={className}
    speed={2}
    width={325}
    height={380}
    viewBox="0 0 325 380"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="0" rx="40" ry="40" width="325" height="380" />
  </ContentLoader>
);

export default WeeklyForecastSkeleton;
