export type Environment = 'dev' | 'prod';

export const ENVIRONMENTS = {
    dev: {
        apiBaseUrl: 'https://app-behavora.alexweb.md',
        scriptSrc: 'https://cdn-behavora.alexweb.md/widget/loader.js',
        siteId: 'site_XsWxm9OtWH',
    },
    prod: {
        apiBaseUrl: 'https://app.behavora.com',
        scriptSrc: 'https://cdn.behavora.com/widget/loader.js',
        siteId: 'site_K4J8jmqoyK',
    },
} as const;

export const DEFAULT_ENVIRONMENT: Environment = 'dev';

export const getEnvironmentConfig = (env: Environment) => ENVIRONMENTS[env];
