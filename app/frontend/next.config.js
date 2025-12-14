/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/legacy/:path*',
        destination: 'http://localhost:3000/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
