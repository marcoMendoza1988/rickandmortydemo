import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

export interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  query: string;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  query: '',
};

export const fetchCharacters:any = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page, query }: { page: number; query?: string }) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
      params: { page, name: query }
    });
    return response.data;
  }
);

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCharacters.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCharacters.fulfilled, (state, action) => {
          state.loading = false;
          state.characters = action.payload.results;
          state.totalPages = action.payload.info.pages;
        })
        .addCase(fetchCharacters.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch characters';
        });
    }
});

export const { setPage, setQuery } = charactersSlice.actions;

export default charactersSlice.reducer;
