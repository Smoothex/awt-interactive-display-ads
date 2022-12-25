import React from 'react';
import {
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import AdTemplateMoreMenu from "./AdTemplateMoreMenu";
import {ImageAspectRatio} from "@mui/icons-material";
import Ad from "../../ads/Ad.interface";

const AdTemplateListItem = ({currentAd}: {currentAd: Ad}) => {
    return (
        <ListItem
            secondaryAction={
                <AdTemplateMoreMenu ad={currentAd} />
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

export default AdTemplateListItem;