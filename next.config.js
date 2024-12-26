// next.config.js
const nextConfig = {
    reactStrictMode: true,
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
  };
  
  module.exports = nextConfig;
  