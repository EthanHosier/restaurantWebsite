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
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port:"",
        pathname:"/premium_photo-1679026956879-05c0a4e63f3a",
      }
    ],
  },
}
//https://plus.unsplash.com/premium_photo-1679026956879-05c0a4e63f3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80