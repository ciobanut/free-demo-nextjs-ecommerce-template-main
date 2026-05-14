'use client';
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "../../redux/store";
import { updatePageMetrics } from "../../redux/features/debug-slice";

export const usePageMetrics = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const pageStartTimeRef = useRef<number>(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Update URL when pathname changes
        dispatch(updatePageMetrics({ url: window.location.href }));

        // Update referrer
        dispatch(updatePageMetrics({ referrer: document.referrer || null }));

        // Reset page start time on navigation
        pageStartTimeRef.current = Date.now();
    }, [pathname, dispatch]);

    useEffect(() => {
        const updateDeviceSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            dispatch(updatePageMetrics({ deviceSize: `${width}x${height}` }));
        };

        const updateScrollPercent = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
            dispatch(updatePageMetrics({ scrollPercent }));
        };

        const updateTimeOnPage = () => {
            const timeOnPageMs = Date.now() - pageStartTimeRef.current;
            dispatch(updatePageMetrics({ timeOnPageMs }));
        };

        // Initial updates
        updateDeviceSize();
        updateScrollPercent();
        updateTimeOnPage();

        // Set up event listeners with debouncing
        let resizeTimeout: NodeJS.Timeout;
        let scrollTimeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateDeviceSize, 200);
        };

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateScrollPercent, 200);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        // Update time on page every second
        intervalRef.current = setInterval(updateTimeOnPage, 1000);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(resizeTimeout);
            clearTimeout(scrollTimeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [dispatch]);
};