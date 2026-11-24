import type { NextConfig } from "next";

const currentPortrait="/images/bebin-r-portrait.png";
const retiredPortraits=["/images/bebin-r.png","/images/bebin.jpg","/images/avatar.jpg","/images/profile.png"];
const nextConfig: NextConfig = {
  devIndicators: false,
  redirects() {
    return [
      ...["/opengraph-image", "/twitter-image", ...retiredPortraits].map(source=>({source,destination:currentPortrait,permanent:true})),
      // Old Next image-optimizer links must not keep serving the retired photo.
      ...retiredPortraits.map(url=>({source:"/_next/image",has:[{type:"query" as const,key:"url",value:url.replaceAll(".",String.raw`\.`)}],destination:currentPortrait,permanent:true})),
    ];
  },
};
export default nextConfig;
