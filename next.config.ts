import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/users?page=1",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "cache-control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
 
  /* config options here */
};

export default nextConfig;
