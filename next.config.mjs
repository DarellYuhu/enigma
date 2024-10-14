import withBundleAnalyzer from "@next/bundle-analyzer";

const nextWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextWithBundleAnalyzer(nextConfig);
