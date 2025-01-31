import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotnet from "dotenv";

dotnet.config();

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
