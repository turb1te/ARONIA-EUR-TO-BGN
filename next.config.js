/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath for production/GitHub Pages deployment
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/ARONIA-EUR-TO-BGN',
    assetPrefix: '/ARONIA-EUR-TO-BGN/',
  }),
  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = nextConfig 