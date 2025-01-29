import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotnet from "dotenv";

dotnet.config();

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
