/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://host.docker.internal:3001/api/:path*",
  //     }
  //   ];
  // }
};

export default nextConfig;
