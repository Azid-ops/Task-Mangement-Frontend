import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Kubernetes mein yahan aapki Backend Service ka internal DNS aayega
        destination: 'http://task-app-service:5000/:path*', 
      },
    ];
  },
};

export default nextConfig;
