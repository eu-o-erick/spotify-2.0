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
      console.log("setPlayingTrack", action.payload);

      state.indexCurrentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      console.log("setIsPlaying", action.payload);

      state.isPlaying = action.payload;
    },
  },
});

export const { setPlayingTrack, setIsPlaying } = playingTrackSlice.actions;

export const rootReducer = {
  track: playingTrackSlice.reducer,
};
