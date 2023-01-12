import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

import Ad from "../../ads/Ad.interface";

import Container from "../../ads/Container.interface";

interface AdsState {
  diagramStarter: Ad | null;
  diagramContainers: Container[];
  diagramSelectedNode: Ad | Container | null;
}

const initialState: AdsState = {
  diagramStarter: null,
  diagramContainers: [],
  diagramSelectedNode: null,
}

const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setDiagramStarter: (state, action: PayloadAction<{ diagramStarter: Ad | null }>) => {
      if (action.payload.diagramStarter === null) {
        state.diagramStarter = null;
        state.diagramContainers = [];
        state.diagramSelectedNode = null;
      } else {
        state.diagramStarter = action.payload.diagramStarter;
        state.diagramContainers = action.payload.diagramStarter.props.children;
        state.diagramSelectedNode = null;
      }
    },
    setDiagramSelectedNode: (state, action: PayloadAction<{ selectedNode: Ad | Container | null }>) => {
      state.diagramSelectedNode = action.payload.selectedNode;
    },
  }
});

export const {
  setDiagramStarter,
  setDiagramSelectedNode
} = diagramSlice.actions;

export default diagramSlice.reducer;
