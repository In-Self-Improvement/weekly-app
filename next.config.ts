import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  distDir: "./out", // Changes the build output directory to `./dist/`.
  webpack: (config: WebpackConfig) => {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
