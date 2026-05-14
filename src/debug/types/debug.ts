export interface PageMetrics {
    url: string;
    deviceSize: string;
    scrollPercent: number;
    timeOnPageMs: number;
    referrer: string | null;
}

export interface NetworkLog {
    id: string;
    timestamp: number;
    method: string;
    url: string;
    status?: number;
    requestBody?: unknown;
    responseBody?: unknown;
    responseTime?: number;
}

export interface DebugState {
    visitorId: string | null;
    requests: {
        track: NetworkLog[];
        predict: NetworkLog[];
    };
    pageMetrics: PageMetrics;
    isCollapsed: boolean;
}