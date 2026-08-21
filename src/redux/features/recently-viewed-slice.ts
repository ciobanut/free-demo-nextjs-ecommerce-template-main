import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type RecentlyViewedItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  viewedAt: number;
};

type InitialState = {
  items: RecentlyViewedItem[];
};

const MAX_ITEMS = 20;

const getInitialState = (): InitialState => {
  if (typeof window === "undefined") {
    return { items: [] };
  }
  try {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch {
    // ignore
  }
  return { items: [] };
};

const persistToStorage = (items: RecentlyViewedItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("recentlyViewed", JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: getInitialState(),
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<Omit<RecentlyViewedItem, "viewedAt">>) => {
      const product = action.payload;

      // Remove existing entry for this product if present
      state.items = state.items.filter((item) => item.id !== product.id);

      // Add to the beginning with timestamp
      state.items.unshift({
        ...product,
        viewedAt: Date.now(),
      });

      // Keep only the last MAX_ITEMS
      if (state.items.length > MAX_ITEMS) {
        state.items = state.items.slice(0, MAX_ITEMS);
      }

      persistToStorage(state.items);
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
      persistToStorage(state.items);
    },
  },
});

export const { addToRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;

// Selectors
export const selectRecentlyViewed = (state: RootState) => state.recentlyViewedReducer.items;

export default recentlyViewedSlice.reducer;
