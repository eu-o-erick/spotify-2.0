import { configureStore } from "@reduxjs/toolkit";
import { playingTrackSlice } from "./slices/playingTrack";
import { isDownloadingSlice } from "./slices/isDownloading ";

export const store = configureStore({
  reducer: {
    track: playingTrackSlice.reducer,
    isDownloading: isDownloadingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
