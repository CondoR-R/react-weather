import type React from "react";
import ContentLoader from "react-content-loader";

interface TommorowTempSkeletonProps {
  className: string;
}

const TommorowTempSkeleton: React.FC<TommorowTempSkeletonProps> = ({
  className,
}) => (
  <ContentLoader
    className={className}
    speed={2}
    width={670}
    height={80}
    viewBox="0 0 670 80"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="0" rx="40" ry="40" width="670" height="80" />
  </ContentLoader>
);

export default TommorowTempSkeleton;
