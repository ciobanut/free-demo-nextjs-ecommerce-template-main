'use client';

import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { addTrackRequest, addPredictRequest, setVisitorId } from "../../redux/features/debug-slice";

export const useNetworkLogger = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Set visitor ID from localStorage
        const visitorId = localStorage.getItem('jp_user_id');
        dispatch(setVisitorId(visitorId));

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

            // Check if this is a track or predict request
            const isTrackRequest = url.includes('https://app-behavora.alexweb.md/api/v1/track');
            const isPredictRequest = url.includes('https://app-behavora.alexweb.md/api/v1/predict/');

            if (isTrackRequest || isPredictRequest) {
                const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const startTime = Date.now();

                try {
                    // Capture request body
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

                    // Clone response to capture body
                    const responseClone = response.clone();
                    let responseBody: unknown = null;

                    try {
                        const responseText = await responseClone.text();
                        responseBody = JSON.parse(responseText);
                    } catch {
                        // If not JSON, store as text
                        responseBody = await responseClone.text();
                    }

                    const networkLog = {
                        id: requestId,
                        timestamp: startTime,
                        method: config?.method || 'GET',
                        url,
                        status: response.status,
                        requestBody,
                        responseBody,
                        responseTime: endTime - startTime,
                    };

                    if (isTrackRequest) {
                        dispatch(addTrackRequest(networkLog));
                    } else if (isPredictRequest) {
                        dispatch(addPredictRequest(networkLog));
                    }

                    return response;
                } catch (error) {
                    // Log failed requests too
                    const networkLog = {
                        id: requestId,
                        timestamp: startTime,
                        method: config?.method || 'GET',
                        url,
                        status: 0, // Network error
                        requestBody: config?.body ? JSON.parse(config.body as string) : null,
                        responseBody: null,
                        responseTime: Date.now() - startTime,
                    };

                    if (isTrackRequest) {
                        dispatch(addTrackRequest(networkLog));
                    } else if (isPredictRequest) {
                        dispatch(addPredictRequest(networkLog));
                    }

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