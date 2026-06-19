import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebugState, NetworkLog, PageMetrics } from "../../debug/types/debug";

const initialState: DebugState = {
    visitorId: null,
    requests: {
        track: [],
    },
    pageMetrics: {
        url: "",
        deviceSize: "",
        scrollPercent: 0,
        timeOnPageMs: 0,
        referrer: null,
    },
    isCollapsed: true,
};

const debugSlice = createSlice({
    name: "debug",
    initialState,
    reducers: {
        setVisitorId: (state, action: PayloadAction<string | null>) => {
            state.visitorId = action.payload;
        },
        addTrackRequest: (state, action: PayloadAction<NetworkLog>) => {
            state.requests.track.push(action.payload);
        },
        updatePageMetrics: (state, action: PayloadAction<Partial<PageMetrics>>) => {
            state.pageMetrics = { ...state.pageMetrics, ...action.payload };
        },
        clearLogs: (state) => {
            state.requests.track = [];
        },
        toggleCollapsed: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload;
        },
    },
});

export const {
    setVisitorId,
    addTrackRequest,
    updatePageMetrics,
    clearLogs,
    toggleCollapsed,
    setCollapsed,
} = debugSlice.actions;

export default debugSlice.reducer;
