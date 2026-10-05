/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/computer-technology-crm",
        destination: "/computer-technology-crm/index.html"
      },
      {
        source: "/demo/emerald-interlink",
        destination: "/demo/emerald-interlink/index.html"
      }
    ];
  }
};

export default nextConfig;
