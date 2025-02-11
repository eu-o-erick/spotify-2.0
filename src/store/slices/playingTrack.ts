import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayingTrackSlice {
  indexCurrentTrack: number;
  isVisible: boolean;
  isPlaying: boolean;
}

const initialState: PlayingTrackSlice = {
  indexCurrentTrack: -1,
  isVisible: false,
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
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setPlayingTrack, setIsVisible, setIsPlaying } =
  playingTrackSlice.actions;

export const rootReducer = {
  track: playingTrackSlice.reducer,
};
