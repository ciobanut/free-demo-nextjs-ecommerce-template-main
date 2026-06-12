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
        apiBaseUrl: process.env.DEMO_BEHAVORA_DEV_API_BASE_URL || 'https://dev.behavora.com',
        scriptSrc: process.env.DEMO_BEHAVORA_DEV_SCRIPT_SRC || 'https://dev-cdn.behavora.com/widget/loader.js',
        siteId: process.env.DEMO_BEHAVORA_DEV_SITE_ID,
        wsKey: process.env.DEMO_BEHAVORA_DEV_WS_KEY,
        wsHost: process.env.DEMO_BEHAVORA_DEV_WS_HOST || 'dev.behavora.com',
        wsPort: process.env.DEMO_BEHAVORA_DEV_WS_PORT || '443',
    },
    prod: {
        apiBaseUrl: process.env.DEMO_BEHAVORA_PROD_API_BASE_URL || 'https://app.behavora.com',
        scriptSrc: process.env.DEMO_BEHAVORA_PROD_SCRIPT_SRC || 'https://cdn.behavora.com/widget/loader.js',
        siteId: process.env.DEMO_BEHAVORA_PROD_SITE_ID,
    },
    local: {
        apiBaseUrl: process.env.DEMO_BEHAVORA_LOCAL_API_BASE_URL || 'http://localhost:8082',
        scriptSrc: process.env.DEMO_BEHAVORA_LOCAL_SCRIPT_SRC || 'http://localhost:5173/dist/journey-predictor-widget.umd.js',
        siteId: process.env.DEMO_BEHAVORA_LOCAL_SITE_ID,
        wsKey: process.env.DEMO_BEHAVORA_LOCAL_WS_KEY,
        wsHost: process.env.DEMO_BEHAVORA_LOCAL_WS_HOST || 'localhost',
        wsPort: process.env.DEMO_BEHAVORA_LOCAL_WS_PORT || '8080',
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
    } catch { }
    return base;
};
