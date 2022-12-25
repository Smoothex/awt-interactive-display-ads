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
import {closeRemoveAdTemplateDialog} from "../../features/dialog/dialogSlice";
import {removeAd} from "../../features/ad/adSlice";

export default function RemoveAdTemplateDialog() {
    const { removeAdTemplateDialogProps } = useSelector((store: RootState) => store.dialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeRemoveAdTemplateDialog());
    };

    const handleRemove = () => {
        dispatch(removeAd({key: removeAdTemplateDialogProps.adKey}));
        dispatch(closeRemoveAdTemplateDialog());
    }

    return (
        <Dialog
            open={ removeAdTemplateDialogProps.isOpen }
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
                    Remove the ad template "{removeAdTemplateDialogProps.adName}"?
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
