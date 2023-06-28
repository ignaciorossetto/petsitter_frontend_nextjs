/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      });
      return config;
    },
    images:{
      remotePatterns:[
        {
          protocol: 'https',
          hostname: 'www.hartz.com',
          port: ''
        
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: ''
        
        },

      ]
    }
  };
  
  module.exports = nextConfig;
