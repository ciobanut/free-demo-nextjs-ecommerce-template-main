'use client';

import React, { useState } from 'react';
import CompactView from './CompactView';
import ExpandedView from './ExpandedView';
import { useNetworkLogger } from '../hooks/useNetworkLogger';
import { usePageMetrics } from '../hooks/usePageMetrics';

const DebugPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    useNetworkLogger();
    usePageMetrics();

    return isExpanded
        ? <ExpandedView onCollapse={() => setIsExpanded(false)} />
        : <CompactView onExpand={() => setIsExpanded(true)} />;
};

export default DebugPanel;
