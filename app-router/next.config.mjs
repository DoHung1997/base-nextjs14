/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
    env: {
        customKey: process.env.CUSTOM_KEY,
    },
};

export default withNextIntl(nextConfig);
