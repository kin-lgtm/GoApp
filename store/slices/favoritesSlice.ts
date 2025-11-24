import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TransportItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  status?: string;
  type?: string;
  departure?: string;
  arrival?: string;
  duration?: string;
  price?: number;
}

interface FavoritesState {
  items: TransportItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<TransportItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.items));
    },
    toggleFavorite: (state, action: PayloadAction<TransportItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      AsyncStorage.setItem('favorites', JSON.stringify(state.items));
    },
    loadFavorites: (state, action: PayloadAction<TransportItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
