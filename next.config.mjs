/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/hamdee-crm",
        destination: "/hamdee-crm/index.html"
      },
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
