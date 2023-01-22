import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Cancel, DeleteForever as Remove} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {closeAdInstanceRemoveDialog} from "../../features/dialog/dialogSlice";
import {removeAd} from "../../features/ad/adSlice";
import {setDiagramStarter} from "../../features/diagram/diagramSlice";

export default function AdInstanceRemoveDialog() {
    const { adInstanceRemoveDialogProps } = useSelector((store: RootState) => store.dialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeAdInstanceRemoveDialog());
    };

    const handleRemove = () => {
        //-- Remove the diagram selection
        dispatch(setDiagramStarter({diagramStarter: null}));
        //-- Remove the ad from the ad slice
        dispatch(removeAd({key: adInstanceRemoveDialogProps.adKey}));
        //-- Close the dialog
        dispatch(closeAdInstanceRemoveDialog());
    }

    return (
        <Dialog
            open={ adInstanceRemoveDialogProps.isOpen }
            onClose={handleClose}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleRemove();
                }
            }}
        >
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogContent dividers>
                <DialogContentText sx={{ marginBottom: "0.5rem" }}>
                    Remove the ad instance "{adInstanceRemoveDialogProps.adName}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    startIcon={<Cancel />}
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Remove />}
                    onClick={handleRemove}>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    );
}
