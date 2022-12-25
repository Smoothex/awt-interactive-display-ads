import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {AddToPhotos, Cancel} from "@mui/icons-material";
import {useState} from "react";
import {AdType} from "../../ads/Ad.interface";
import {useDispatch, useSelector} from "react-redux";
import {createAdTemplate} from "../../features/ad/adSlice";
import {RootState} from "../../app/store";
import {closeCreateAdTemplateDialog} from "../../features/dialog/dialogSlice";

export default function CreateAdTemplateDialog() {
    const {isCreateAdTemplateDialogOpen} = useSelector((store: RootState) => store.dialog);
    const [name, setName] = useState("");
    const [type, setType] = useState(AdType.StandardBanner);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeCreateAdTemplateDialog());
    };

    const handleCreate = () => {
        dispatch(createAdTemplate({ name: name, type: type }));
        dispatch(closeCreateAdTemplateDialog());
        setName("");
    }

    return (
        <Dialog
            open={isCreateAdTemplateDialogOpen}
            onClose={handleClose}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleCreate();
                }
            }}
        >
            <DialogTitle>New template</DialogTitle>
            <DialogContent dividers>
                <DialogContentText sx={{ marginBottom: "0.5rem" }}>
                    To create a new template, please provide a name for the template and choose the template type.
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
                <FormControl sx={{ margin: "0.5rem 0" }}>
                    <FormLabel id="type-label">Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="type-label"
                        name="type"
                        value={ type }
                        onChange={(e) => setType(e.target.value as AdType)}
                        row
                    >
                        <FormControlLabel
                            label="Standard Banner"
                            value={AdType.StandardBanner}
                            control={<Radio />}/>
                        <FormControlLabel
                            label="L-Banner"
                            value={AdType.LBanner}
                            control={<Radio />}/>
                    </RadioGroup>
                </FormControl>
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
                    startIcon={<AddToPhotos />}
                    onClick={handleCreate}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}