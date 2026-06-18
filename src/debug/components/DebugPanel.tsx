'use client';

import React, { useState } from 'react';
import CompactView from './CompactView';
import ExpandedView from './ExpandedView';
import { useNetworkLogger } from '../hooks/useNetworkLogger';

const DebugPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    useNetworkLogger();

    return isExpanded
        ? <ExpandedView onCollapse={() => setIsExpanded(false)} />
        : <CompactView onExpand={() => setIsExpanded(true)} />;
};

export default DebugPanel;
