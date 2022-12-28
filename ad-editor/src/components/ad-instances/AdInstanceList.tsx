import React from 'react';
import {
    Divider,
    List,
} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import AdInstanceListSubheader from "./AdInstanceListSubheader";
import AdInstanceListItem from "./AdInstanceListItem";

const AdInstanceList = () => {
    const {ads} = useSelector((store: RootState) => store.ad);

    return (
        <List
            sx={{width: '100%', minWidth: '100px'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<AdInstanceListSubheader />}
        >
            <Divider/>
            {ads.filter((currentAd) => !currentAd.isTemplate)
                .map((currentAd) => <AdInstanceListItem key={currentAd.key} currentAd={currentAd} />)}
        </List>
    );
};

export default AdInstanceList;