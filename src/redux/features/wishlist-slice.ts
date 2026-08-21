import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  items: WishListItem[];
};

export type WishListItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const STORAGE_KEY = "wishlist";

const getInitialState = (): InitialState => {
  if (typeof window === "undefined") {
    return { items: [] };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
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

const persistToStorage = (items: WishListItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState: getInitialState(),
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishListItem>) => {
      const { id, title, price, quantity, imgs, discountedPrice, status } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          imgs,
          discountedPrice,
          status,
        });
      }

      persistToStorage(state.items);
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      persistToStorage(state.items);
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
      persistToStorage(state.items);
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;

// Thunk-like action for toggling wishlist status
export const toggleToWishlist =
  (item: WishListItem) => (dispatch: any, getState: any) => {
    const state = getState();
    const isInWishlist = state.wishlistReducer.items.some(
      (i: WishListItem) => i.id === item.id
    );
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(item.id));
    } else {
      dispatch(addItemToWishlist(item));
    }
  };

export default wishlist.reducer;
