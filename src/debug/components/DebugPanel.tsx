'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { setCollapsed } from '../../redux/features/debug-slice';
import { usePageMetrics } from '../hooks/usePageMetrics';
import { useNetworkLogger } from '../hooks/useNetworkLogger';
import CompactView from './CompactView';
import ExpandedView from './ExpandedView';

const DebugPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.debugReducer.isCollapsed);

  // Initialize hooks
  usePageMetrics();
  useNetworkLogger();

  // Auto-collapse on mobile, auto-expand on desktop
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch(setCollapsed(isMobile));
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleExpand = () => {
    dispatch(setCollapsed(false));
  };

  const handleCollapse = () => {
    dispatch(setCollapsed(true));
  };

  return isCollapsed ? (
    <CompactView onExpand={handleExpand} />
  ) : (
    <ExpandedView onCollapse={handleCollapse} />
  );
};

export default DebugPanel;