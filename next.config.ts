import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.flashscore.com",
        port: "",
        pathname: "/res/image/data/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "img.a.transfermarkt.technology",
        port: "",
        pathname: "/portrait/medium/**",
      },
    ],
  },
};

export default nextConfig;
