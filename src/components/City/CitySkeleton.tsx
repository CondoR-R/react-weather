import ContentLoader from "react-content-loader";

const CitySkeleton = () => (
  <ContentLoader
    speed={2}
    width={100}
    height={30}
    viewBox="0 0 100 30"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100" height="30" />
  </ContentLoader>
);

export default CitySkeleton;
