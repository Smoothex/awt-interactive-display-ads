import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

const initialState = {
    adTemplateCreateDialogProps: {
        isOpen: false
    },
    adTemplateRemoveDialogProps : {
        isOpen: false,
        adName: "",
        adKey: "",
    },
    adInstanceCreateDialogProps: {
        isOpen: false
    },
    adInstanceRemoveDialogProps: {
        isOpen: false,
        adName: "",
        adKey: "",
    },
}

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialState,
    reducers: {
        openAdTemplateCreateDialog: (state) => {
            state.adTemplateCreateDialogProps.isOpen = true;
        },
        closeAdTemplateCreateDialog: (state) => {
            state.adTemplateCreateDialogProps.isOpen = false;
        },
        openAdTemplateRemoveDialog: (state, action:PayloadAction<{ adName: string, adKey: string }>) => {
            state.adTemplateRemoveDialogProps.isOpen = true;
            state.adTemplateRemoveDialogProps.adName = action.payload.adName;
            state.adTemplateRemoveDialogProps.adKey = action.payload.adKey;
        },
        closeAdTemplateRemoveDialog: (state) => {
            state.adTemplateRemoveDialogProps.isOpen = false;
            state.adTemplateRemoveDialogProps.adName = "";
            state.adTemplateRemoveDialogProps.adKey = "";
        },
        openAdInstanceCreateDialog: (state) => {
            state.adInstanceCreateDialogProps.isOpen = true;
        },
        closeAdInstanceCreateDialog: (state) => {
            state.adInstanceCreateDialogProps.isOpen = false;
        },
        openAdInstanceRemoveDialog: (state, action:PayloadAction<{ adName: string, adKey: string }>) => {
            state.adInstanceRemoveDialogProps.isOpen = true;
            state.adInstanceRemoveDialogProps.adName = action.payload.adName;
            state.adInstanceRemoveDialogProps.adKey = action.payload.adKey;
        },
        closeAdInstanceRemoveDialog: (state) => {
            state.adInstanceRemoveDialogProps.isOpen = false;
            state.adInstanceRemoveDialogProps.adName = "";
            state.adInstanceRemoveDialogProps.adKey = "";
        },
    }
});

export const {
    openAdTemplateCreateDialog,
    closeAdTemplateCreateDialog,
    openAdTemplateRemoveDialog,
    closeAdTemplateRemoveDialog,
    openAdInstanceCreateDialog,
    closeAdInstanceCreateDialog,
    openAdInstanceRemoveDialog,
    closeAdInstanceRemoveDialog
} = dialogSlice.actions;

export default dialogSlice.reducer;