'use client';

import React from 'react';
import { useAppSelector } from '../../../redux/store';

const OverviewTab: React.FC = () => {
    const { pageMetrics, visitorId } = useAppSelector((state) => state.debugReducer);

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    };

    const metrics = [
        { label: 'Current URL', value: pageMetrics.url || 'Loading...' },
        { label: 'Device Size', value: pageMetrics.deviceSize || 'Loading...' },
        { label: 'Scroll %', value: `${pageMetrics.scrollPercent}%` },
        { label: 'Time on Page', value: formatTime(pageMetrics.timeOnPageMs) },
        { label: 'Referrer', value: pageMetrics.referrer || 'Direct' },
        { label: 'Visitor ID', value: visitorId || 'Not set' },
    ];

    return (
        <div className="p-4">
            <div className="space-y-3">
                {metrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0 mr-4">
                            {metric.label}:
                        </span>
                        <span className="text-sm text-gray-900 break-all text-right">
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewTab;