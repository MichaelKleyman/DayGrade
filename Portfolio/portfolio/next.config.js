/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa');

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//   },
// });

// module.exports = nextConfig;
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  reactStrictMode: true,
});
module.exports = nextConfig;
