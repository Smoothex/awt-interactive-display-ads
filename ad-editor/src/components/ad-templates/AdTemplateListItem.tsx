import {MouseEventHandler} from 'react';
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

interface AdTemplateListItemProps {
    currentAd: Ad;
    onClick: MouseEventHandler<HTMLElement>;
    selected: boolean;
}

const AdTemplateListItem = (props: AdTemplateListItemProps) => {
    const {
        currentAd,
        onClick,
        selected
    }: AdTemplateListItemProps = props;

    return (
        <ListItem
            secondaryAction={
                <AdTemplateMoreMenu ad={currentAd} />
            }
            disablePadding
            onClick={onClick}
        >
            <ListItemButton selected={selected}>
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