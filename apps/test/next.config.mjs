/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@wallet-kit/react'],
    images: {
        domains: ['imagedelivery.net'],
    },
}

export default nextConfig
