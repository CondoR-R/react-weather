import type React from "react";
import ContentLoader from "react-content-loader";

interface HourlyChartSkeletonProps {
  className: string;
}

const HourlyChartSkeleton: React.FC<HourlyChartSkeletonProps> = ({
  className,
}) => (
  <ContentLoader
    className={className}
    speed={2}
    width={1015}
    height={280}
    viewBox="0 0 1015 280"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="0" rx="40" ry="40" width="1015" height="280" />
  </ContentLoader>
);

export default HourlyChartSkeleton;
