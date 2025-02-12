import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayingTrackSlice {
  indexCurrentTrack: number;
  isPlaying: boolean;
}

const initialState: PlayingTrackSlice = {
  indexCurrentTrack: 0,
  isPlaying: false,
};

export const playingTrackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setPlayingTrack: (state, action: PayloadAction<number>) => {
      state.indexCurrentTrack = action.payload;
      state.isPlaying = true;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setPlayingTrack, setIsPlaying } = playingTrackSlice.actions;

export const rootReducer = {
  track: playingTrackSlice.reducer,
};
