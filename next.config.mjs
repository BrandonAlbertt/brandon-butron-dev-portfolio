/** @type {import('next').NextConfig} */
const nextConfig = {

  turbopack: {}, // Si, se que estoy Turbopack, no es un error.


  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
    }
    return config
  },
  experimental: {
    esmExternals: true,
  },
}

export default nextConfig
