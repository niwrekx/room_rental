// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig






/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: [
        'res.cloudinary.com', 
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com'
      ]
    },
    webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
      }
  }
  
  module.exports = nextConfig