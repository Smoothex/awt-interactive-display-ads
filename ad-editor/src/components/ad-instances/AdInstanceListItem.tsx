import React from 'react';
import {
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import AdInstanceMoreMenu from "./AdInstanceMoreMenu";
import {ImageAspectRatio} from "@mui/icons-material";
import Ad from "../../ads/Ad.interface";

const AdInstanceListItem = ({currentAd}: {currentAd: Ad}) => {
    return (
        <ListItem
            secondaryAction={
                <AdInstanceMoreMenu ad={currentAd} />
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemIcon style={{minWidth: 0, marginRight: 16}}>
                    <ImageAspectRatio/>
                </ListItemIcon>
                <ListItemText primary={currentAd.name}/>
            </ListItemButton>
            <Divider/>
        </ListItem>
    );
};

export default AdInstanceListItem;