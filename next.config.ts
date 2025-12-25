import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
