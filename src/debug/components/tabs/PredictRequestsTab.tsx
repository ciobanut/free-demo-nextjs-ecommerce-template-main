'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { clearLogs } from '../../../redux/features/debug-slice';

const PredictRequestsTab: React.FC = () => {
    const dispatch = useAppDispatch();
    const { requests } = useAppSelector((state) => state.debugReducer);
    const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
    const [flash, setFlash] = useState(false);

    const predictRequests = requests.predict;
    const latestRequest = predictRequests.length > 0 ? predictRequests[predictRequests.length - 1] : null;

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const toggleExpanded = (requestId: string) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    const clearPredictLogs = () => {
        // We need to clear only predict logs, but the action clears both
        // For now, we'll clear all logs. Could be improved later.
        dispatch(clearLogs());
    };

    useEffect(() => {
        if (latestRequest) {
            setFlash(true);
            const timer = setTimeout(() => setFlash(false), 200);
            return () => clearTimeout(timer);
        }
    }, [latestRequest?.id]);

    if (predictRequests.length === 0) {
        return (
            <div className="p-4 text-center text-gray-6">
                No predict requests captured yet.
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-7">
                    Predict Requests ({predictRequests.length})
                </h4>
                <button
                    onClick={clearPredictLogs}
                    className="text-xs bg-red hover:bg-red-dark text-white px-2 py-1 rounded transition-colors duration-200"
                >
                    Clear
                </button>
            </div>

            {latestRequest && (
                <div className={` mb-4 rounded transition-colors duration-200 ${flash ? 'bg-yellow-light-1' : 'bg-gray-2'}`}>
                    <pre className="text-xs bg-gray-1 border overflow-x-auto max-h-40 overflow-y-auto rounded">
                        {latestRequest.responseBody
                            ? JSON.stringify(latestRequest.responseBody, null, 2)
                            : 'No response'}
                    </pre>
                </div>
            )}

            <div className="space-y-2 max-h-80 overflow-y-auto">
                {predictRequests.slice().reverse().map((request) => (
                    <div key={request.id} className="border border-gray-3 rounded-lg">
                        <button
                            onClick={() => toggleExpanded(request.id)}
                            className="w-full text-left p-3 hover:bg-gray-1 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-7">
                                        {formatTimestamp(request.timestamp)}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${request.status && request.status >= 200 && request.status < 300
                                        ? 'bg-green-light-6 text-green-dark'
                                        : request.status
                                            ? 'bg-red-light-5 text-red-dark'
                                            : 'bg-yellow-light-2 text-yellow-dark-2'
                                        }`}>
                                        {request.status || 'ERR'}
                                    </span>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${expandedRequest === request.id ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {expandedRequest === request.id && (
                            <div className="px-3 pb-3 border-t border-gray-2">
                                <div className="grid gap-4 mt-3">
                                    <div>
                                        <h5 className="text-xs font-medium text-gray-6 mb-2">Response Payload</h5>
                                        <pre className="text-xs bg-gray-1 p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                                            {request.responseBody
                                                ? JSON.stringify(request.responseBody, null, 2)
                                                : 'No response body'
                                            }
                                        </pre>
                                    </div>
                                </div>
                                {request.responseTime && (
                                    <div className="mt-2 text-xs text-gray-6">
                                        Response time: {request.responseTime}ms
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PredictRequestsTab;