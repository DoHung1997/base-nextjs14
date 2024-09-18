/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  i18n,
  webpack: (config) => {
    // camelCase style names from css modules
    config.module.rules
        ?.find(({oneOf}) => !!oneOf).oneOf
        .filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
        .reduce((acc, {use}) => acc.concat(use), [])
        .forEach(({options}) => {
          if (options.modules) {
            options.modules.exportLocalsConvention = 'camelCase';
          }
        });
    return config;
  },
  images: {
    domains: ['localhost', '14.177.182.182']
  },
    // swcMinify: true
};

module.exports = nextConfig
// export default nextConfig;
