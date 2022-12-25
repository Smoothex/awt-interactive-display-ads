import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

const initialState = {
    isCreateAdTemplateDialogOpen: false,
    removeAdTemplateDialogProps : {
        isOpen: false,
        adName: "",
        adKey: "",
    }
}

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialState,
    reducers: {
        openCreateAdTemplateDialog: (state) => {
            state.isCreateAdTemplateDialogOpen = true;
        },
        closeCreateAdTemplateDialog: (state) => {
            state.isCreateAdTemplateDialogOpen = false;
        },
        openRemoveAdTemplateDialog: (state, action:PayloadAction<{ adName: string, adKey: string }>) => {
            state.removeAdTemplateDialogProps.isOpen = true;
            state.removeAdTemplateDialogProps.adName = action.payload.adName;
            state.removeAdTemplateDialogProps.adKey = action.payload.adKey;
        },
        closeRemoveAdTemplateDialog: (state) => {
            state.removeAdTemplateDialogProps.isOpen = false;
            state.removeAdTemplateDialogProps.adName = "";
            state.removeAdTemplateDialogProps.adKey = "";
        }
    }
});

export const {
    openCreateAdTemplateDialog,
    closeCreateAdTemplateDialog,
    openRemoveAdTemplateDialog,
    closeRemoveAdTemplateDialog
} = dialogSlice.actions;

export default dialogSlice.reducer;