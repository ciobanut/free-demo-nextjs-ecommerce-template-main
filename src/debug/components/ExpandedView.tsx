'use client';

import React, { useState } from 'react';
import { useAppSelector } from '../../redux/store';
import OverviewTab from './tabs/OverviewTab';
import TrackRequestsTab from './tabs/TrackRequestsTab';
import PredictRequestsTab from './tabs/PredictRequestsTab';

interface ExpandedViewProps {
    onCollapse: () => void;
}

type TabType = 'overview' | 'track' | 'predict';

const ExpandedView: React.FC<ExpandedViewProps> = ({ onCollapse }) => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const { requests } = useAppSelector((state) => state.debugReducer);

    const trackCount = requests.track.length;
    const predictCount = requests.predict.length;

    const tabs = [
        { id: 'overview' as TabType, label: 'Overview' },
        { id: 'track' as TabType, label: `Track Requests (${trackCount})` },
        { id: 'predict' as TabType, label: `Predict Requests (${predictCount})` },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'track':
                return <TrackRequestsTab />;
            case 'predict':
                return <PredictRequestsTab />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800">Debug Panel</h3>
                <button
                    onClick={onCollapse}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab.id
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="max-h-96 overflow-y-auto">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ExpandedView;