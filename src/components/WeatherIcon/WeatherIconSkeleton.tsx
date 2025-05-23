import ContentLoader from "react-content-loader";

const WeatherIconSkeleton = () => (
  <ContentLoader
    speed={2}
    width={320}
    height={296}
    viewBox="0 0 320 296"
    backgroundColor="color-mix(in srgb, #fff 20%, transparent)"
    foregroundColor="color-mix(in srgb, #fff 50%, transparent)"
  >
    <rect x="20" y="46" rx="40" ry="40" width="300" height="250" />
  </ContentLoader>
);

export default WeatherIconSkeleton;
