import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AddToPhotos as AddIcon, Cancel as CancelIcon} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {createAdInstance} from "../../features/ad/adSlice";
import {closeAdInstanceCreateDialog} from "../../features/dialog/dialogSlice";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function AdInstanceCreateDialog() {
    const {adInstanceCreateDialogProps} = useSelector((store: RootState) => store.dialog);
    const {ads} = useSelector((store: RootState) => store.ad);
    const [name, setName] = useState<string>("");
    const [templateKey, setTemplateKey] = useState<string>("");
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeAdInstanceCreateDialog());
    };

    const handleCreate = () => {
        dispatch(createAdInstance({name: name, adTemplateKey: templateKey}));
        dispatch(closeAdInstanceCreateDialog());
        setName("");
    }

    return (
        <Dialog
            open={adInstanceCreateDialogProps.isOpen}
            onClose={handleClose}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleCreate();
                }
            }}
        >
            <DialogTitle>New instance</DialogTitle>
            <DialogContent dividers>
                <DialogContentText sx={{ marginBottom: "0.5rem" }}>
                    To create a new ad instance, please provide a name for the instance and choose a template from which the instance should be created.
                </DialogContentText>
                <TextField
                    id="name"
                    label="Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    fullWidth
                    sx={{ margin: "0.5rem 0" }}
                />
                <FormControl fullWidth sx={{ margin: "0.5rem 0" }}>
                    <InputLabel id="template-select-label">Template</InputLabel>
                    <Select
                        labelId="template-select-label"
                        id="template-select"
                        value={templateKey}
                        label="Template"
                        onChange={(e) => setTemplateKey(e.target.value as string)}
                    >
                        {ads.filter((currentAd) => currentAd.isTemplate)
                            .map((currentAd) => <MenuItem key={currentAd.key} value={currentAd.key}> {currentAd.name} </MenuItem>)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    startIcon={<CancelIcon />}
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}