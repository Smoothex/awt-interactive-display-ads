import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ad from "../../ads/Ad.interface";

interface AdsState {
  diagramStarter: Ad | null,
}

const initialState: AdsState = {
  diagramStarter: null
}

const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setDiagramStarter: (state, action: PayloadAction<{ diagramStarter: Ad | null }>) => {
      state.diagramStarter = action.payload.diagramStarter;
    },
  }
});

export const {
  setDiagramStarter
} = diagramSlice.actions;

export default diagramSlice.reducer;
