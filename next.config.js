/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  trailingSlash: true,
  // after 12.3 versions.
  images: {
    unoptimized: true
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
