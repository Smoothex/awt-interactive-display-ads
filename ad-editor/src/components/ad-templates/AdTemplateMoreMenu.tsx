import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {DeleteForever as RemoveIcon, Download as DownloadIcon} from "@mui/icons-material";
import {ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import Ad from "../../ads/Ad.interface";
import {downloadAdAsJson} from "../../features/ad/adSlice";
import {openAdTemplateRemoveDialog} from "../../features/dialog/dialogSlice";

export default function AdTemplateMoreMenu({ ad }: { ad: Ad }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const handleDownloadAdAsJson = () => {
        dispatch(downloadAdAsJson({key: ad.key}));
        setAnchorEl(null);
    }

    const handleRemoveAdTemplate = () => {
        dispatch(openAdTemplateRemoveDialog({adName: ad.name, adKey: ad.key}));
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id={"ad-template-more-button-" + ad.key}
                aria-controls={open ? ("ad-template-more-menu-" + ad.key) : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id={"ad-template-more-menu-" + ad.key}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleDownloadAdAsJson}
                >
                    <ListItemIcon style={{minWidth: 0, marginRight: 16}}>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Download as JSON</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={handleRemoveAdTemplate}
                >
                    <ListItemIcon style={{minWidth: 0, marginRight: 16}}>
                        <RemoveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}