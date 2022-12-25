import React from 'react';
import {
    Button,
    ListSubheader,
    Typography
} from "@mui/material";
import {AddToPhotos} from "@mui/icons-material";
import {openCreateAdTemplateDialog} from "../../features/dialog/dialogSlice";
import {useDispatch} from "react-redux";

const AdInstanceListSubheader = () => {
    const dispatch = useDispatch();

    return (
        <ListSubheader
            component="div" id="nested-list-subheader"
            style={{ padding: "12px 16px" }}
        >
            <Typography
                component="div"
                variant="h6"
                style={{display: "flex"}}>
                Ad Instances
                <Button
                    variant="contained"
                    startIcon={<AddToPhotos />}
                    style={{ marginLeft: "auto" }}
                    onClick={() => dispatch(openCreateAdTemplateDialog())}>
                    New
                </Button>
            </Typography>
        </ListSubheader>
    );
};

export default AdInstanceListSubheader;