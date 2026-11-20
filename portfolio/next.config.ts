import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  redirects() {
    return ["/opengraph-image", "/twitter-image"].map((source) => ({
      source,
      destination: "/images/bebin-r.png",
      permanent: true,
    }));
  },
};

export default nextConfig;
