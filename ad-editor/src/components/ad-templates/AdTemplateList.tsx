import React from 'react';
import {
    Divider,
    List,
} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import AdTemplateListSubheader from "./AdTemplateListSubheader";
import AdTemplateListItem from "./AdTemplateListItem";

const AdTemplateList = () => {
    const {ads} = useSelector((store: RootState) => store.ad);

    return (
        <List
            sx={{width: '100%', 'min-width': '100px'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<AdTemplateListSubheader />}
        >
            <Divider/>
            {ads.filter((currentAd) => currentAd.isTemplate)
                .map((currentAd) => <AdTemplateListItem key={currentAd.key} currentAd={currentAd} />)}
        </List>
    );
};

export default AdTemplateList;