'use client';

import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { addTrackRequest, setVisitorId } from "../../redux/features/debug-slice";
import { useEnvironment } from "../../app/context/EnvironmentContext";
import { getEnvironmentConfig } from "../../config/environments";

export const useNetworkLogger = () => {
    const dispatch = useAppDispatch();
    const { currentEnvironment } = useEnvironment();

    useEffect(() => {
        const visitorId = localStorage.getItem('jp_user_id');
        dispatch(setVisitorId(visitorId));

        const { apiBaseUrl } = getEnvironmentConfig(currentEnvironment);
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const [resource, config] = args;
            let url: string;

            if (typeof resource === 'string') {
                url = resource;
            } else if (resource instanceof URL) {
                url = resource.toString();
            } else if (resource instanceof Request) {
                url = resource.url;
            } else {
                url = String(resource);
            }

            const isTrackRequest = url.includes(`${apiBaseUrl}/api/v1/track`);

            if (isTrackRequest) {
                const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const startTime = Date.now();

                try {
                    let requestBody: unknown = null;
                    if (config?.body) {
                        try {
                            requestBody = JSON.parse(config.body as string);
                        } catch {
                            requestBody = config.body;
                        }
                    }

                    const response = await originalFetch(...args);
                    const endTime = Date.now();

                    const responseClone = response.clone();
                    let responseBody: unknown = null;

                    try {
                        const responseText = await responseClone.text();
                        responseBody = JSON.parse(responseText);
                    } catch {
                        responseBody = await responseClone.text();
                    }

                    dispatch(addTrackRequest({
                        id: requestId,
                        timestamp: startTime,
                        method: config?.method || 'GET',
                        url,
                        status: response.status,
                        requestBody,
                        responseBody,
                        responseTime: endTime - startTime,
                    }));

                    return response;
                } catch (error) {
                    dispatch(addTrackRequest({
                        id: requestId,
                        timestamp: startTime,
                        method: config?.method || 'GET',
                        url,
                        status: 0,
                        requestBody: config?.body ? JSON.parse(config.body as string) : null,
                        responseBody: null,
                        responseTime: Date.now() - startTime,
                    }));

                    throw error;
                }
            }

            return originalFetch(...args);
        };

        return () => {
            window.fetch = originalFetch;
        };
    }, [dispatch]);
};
