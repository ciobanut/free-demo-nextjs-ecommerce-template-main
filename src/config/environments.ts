export type Environment = 'dev' | 'prod' | 'local';

export interface EnvironmentConfig {
    apiBaseUrl: string;
    scriptSrc: string;
    siteId: string;
    wsKey?: string;
    wsHost?: string;
    wsPort?: string;
}

export const ENVIRONMENTS: Record<Environment, EnvironmentConfig> = {
    dev: {
        apiBaseUrl: 'https://dev.behavora.com',
        scriptSrc: 'https://dev-cdn.behavora.com/widget/loader.js',
        siteId: 'site_XsWxm9OtWH',
    },
    prod: {
        apiBaseUrl: 'https://app.behavora.com',
        scriptSrc: 'https://cdn.behavora.com/widget/loader.js',
        siteId: 'site_K4J8jmqoyK',
    },
    local: {
        apiBaseUrl: 'http://localhost:8082',
        scriptSrc: 'http://localhost:5173/dist/journey-predictor-widget.umd.js',
        siteId: 'site_O2TVKawgo8',
        wsKey: 'appkey',
        wsHost: 'localhost',
        wsPort: '8080',
    },
};

export const LOCAL_CONFIG_KEY = 'behavora_local_config';

export const DEFAULT_ENVIRONMENT: Environment = 'dev';

export const getEnvironmentConfig = (env: Environment): EnvironmentConfig => {
    const base = ENVIRONMENTS[env];
    if (env !== 'local') return base;

    try {
        const saved = localStorage.getItem(LOCAL_CONFIG_KEY);
        if (saved) {
            const overrides = JSON.parse(saved) as Partial<EnvironmentConfig>;
            return { ...base, ...overrides };
        }
    } catch {}
    return base;
};
