/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/computer-technology-crm",
        destination: "/computer-technology-crm/index.html"
      }
    ];
  }
};

export default nextConfig;
