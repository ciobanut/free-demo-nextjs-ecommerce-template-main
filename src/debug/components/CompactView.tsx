'use client';

import React from 'react';
import { useAppSelector } from '../../redux/store';

interface CompactViewProps {
    onExpand: () => void;
}

const CompactView: React.FC<CompactViewProps> = ({ onExpand }) => {
    const { requests } = useAppSelector((state) => state.debugReducer);

    const trackCount = requests.track.length;
    const predictCount = requests.predict.length;

    return (
        <div className="fixed bottom-4 right-20 z-[9999]">
            <button
                onClick={onExpand}
                className="bg-dark hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
                <span>Debug</span>
                {(trackCount > 0 || predictCount > 0) && (
                    <span className="bg-red-500 font-semibold text-white text-xs px-2 py-1 rounded-full">
                        {trackCount > 0 && `T:${trackCount}`}
                        {trackCount > 0 && predictCount > 0 && ' | '}
                        {predictCount > 0 && `P:${predictCount}`}
                    </span>
                )}
            </button>
        </div>
    );
};

export default CompactView;