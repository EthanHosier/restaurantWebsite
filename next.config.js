/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    minimumCacheTTL: 60*60*3, //3 hrs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/management-restaurants.appspot.com/**',
      },
    ],
  },
}