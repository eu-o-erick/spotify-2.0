import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsDownloadingSlice {
  value: boolean;
}

const initialState: IsDownloadingSlice = {
  value: false,
};

export const isDownloadingSlice = createSlice({
  name: "isDownloading",
  initialState: initialState,
  reducers: {
    setIsDownloading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsDownloading } = isDownloadingSlice.actions;
