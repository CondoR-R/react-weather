import ContentLoader from "react-content-loader";

const CurrentLeftSkeleton = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={200}
    viewBox="0 0 300 200"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="20" rx="15" ry="15" width="150" height="70" />
    <rect x="0" y="106" rx="15" ry="15" width="150" height="27" />
    <rect x="0" y="147" rx="15" ry="15" width="300" height="50" />
  </ContentLoader>
);

export default CurrentLeftSkeleton;
