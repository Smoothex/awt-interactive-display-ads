import {MouseEventHandler} from 'react';
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

interface AdInstanceListItemProps {
    currentAd: Ad;
    onClick: MouseEventHandler<HTMLElement>;
    selected: boolean;
}

const AdInstanceListItem = (props: AdInstanceListItemProps) => {
    const {
        currentAd,
        onClick,
        selected
    }: AdInstanceListItemProps = props;

    return (
        <ListItem
            secondaryAction={
                <AdInstanceMoreMenu ad={currentAd} />
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

export default AdInstanceListItem;