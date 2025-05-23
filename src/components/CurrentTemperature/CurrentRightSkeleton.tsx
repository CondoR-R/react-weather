import ContentLoader from "react-content-loader";

const CurrentRightSkeleton = () => (
  <ContentLoader
    speed={2}
    width={140}
    height={140}
    viewBox="0 0 140 140"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="0" rx="10" ry="10" width="140" height="27" />
    <rect x="0" y="30" rx="10" ry="10" width="80" height="30" />
    <rect x="0" y="80" rx="10" ry="10" width="140" height="27" />
    <rect x="0" y="110" rx="10" ry="10" width="80" height="30" />
  </ContentLoader>
);

export default CurrentRightSkeleton;
