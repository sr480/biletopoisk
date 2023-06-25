/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '**'
      }
    ]
  },
  env: {
    API_URL: 'http://localhost:3001/api/'
  }
}

module.exports = nextConfig
