'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { clearLogs } from '../../../redux/features/debug-slice';

const TrackRequestsTab: React.FC = () => {
    const dispatch = useAppDispatch();
    const { requests } = useAppSelector((state) => state.debugReducer);
    const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

    const trackRequests = requests.track;
    const latestRequest = trackRequests.length > 0 ? trackRequests[trackRequests.length - 1] : null;

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const toggleExpanded = (requestId: string) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    const clearTrackLogs = () => {
        // We need to clear only track logs, but the action clears both
        // For now, we'll clear all logs. Could be improved later.
        dispatch(clearLogs());
    };

    if (trackRequests.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No track requests captured yet.
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-700">
                    Track Requests ({trackRequests.length})
                </h4>
                <button
                    onClick={clearTrackLogs}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors duration-200"
                >
                    Clear
                </button>
            </div>

            {latestRequest && (
                <div className="mb-4 rounded bg-gray-100 p-4 border border-gray-200">
                    <div className="grid gap-4">
                        <div>
                            <h5 className="text-xs font-medium text-gray-600 mb-2">Latest Request Payload</h5>
                            <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                                {latestRequest.requestBody
                                    ? JSON.stringify(latestRequest.requestBody, null, 2)
                                    : 'No request body'
                                }
                            </pre>
                        </div>
                        <div>
                            <h5 className="text-xs font-medium text-gray-600 mb-2">Latest Response Payload</h5>
                            <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                                {latestRequest.responseBody
                                    ? JSON.stringify(latestRequest.responseBody, null, 2)
                                    : 'No response body'
                                }
                            </pre>
                        </div>
                    </div>
                    {latestRequest.responseTime && (
                        <div className="mt-2 text-xs text-gray-500">
                            Response time: {latestRequest.responseTime}ms
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-2 max-h-80 overflow-y-auto">
                {trackRequests.slice().reverse().map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg">
                        <button
                            onClick={() => toggleExpanded(request.id)}
                            className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        {formatTimestamp(request.timestamp)}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${request.status && request.status >= 200 && request.status < 300
                                        ? 'bg-green-100 text-green-800'
                                        : request.status
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
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
                            <div className="px-3 pb-3 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <h5 className="text-xs font-medium text-gray-600 mb-2">Request Payload</h5>
                                        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                                            {request.requestBody
                                                ? JSON.stringify(request.requestBody, null, 2)
                                                : 'No request body'
                                            }
                                        </pre>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-medium text-gray-600 mb-2">Response Payload</h5>
                                        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                                            {request.responseBody
                                                ? JSON.stringify(request.responseBody, null, 2)
                                                : 'No response body'
                                            }
                                        </pre>
                                    </div>
                                </div>
                                {request.responseTime && (
                                    <div className="mt-2 text-xs text-gray-500">
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

export default TrackRequestsTab;