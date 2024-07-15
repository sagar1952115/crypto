import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Assuming you have this in your store setup

interface DataState {
    symbol: string;
    data: any[]; // Replace 'any' with the appropriate type for your data
}

const initialState: DataState = {
    symbol: 'BTC',
    data: []
};

export const fetchData = createAsyncThunk('data/fetchData', async (symbol: string) => {
    const response = await axios.get(`https://crypto-pvyy.onrender.com/data/${symbol}`);
    return response.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSymbol: (state, action: PayloadAction<string>) => {
            state.symbol = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => { 
            state.data = action.payload;
        });
    }
});

export const { setSymbol } = dataSlice.actions;
export const selectData = (state: RootState) => state.data.data;
export const selectSymbol = (state: RootState) => state.data.symbol;
export const dataReducer = dataSlice.reducer;
