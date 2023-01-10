import {useState} from 'react';
import {
    Divider,
    List,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import AdTemplateListSubheader from "./AdTemplateListSubheader";
import AdTemplateListItem from "./AdTemplateListItem";
import Ad from "../../ads/Ad.interface";
import {setDiagramStarter} from "../../features/diagram/diagramSlice";

const AdTemplateList = () => {
    const {ads} = useSelector((store: RootState) => store.ad);
    const {diagramStarter} = useSelector((store: RootState) => store.diagram);
    const [selectedAdTemplate, _setSelectedAdTemplate] = useState<Ad | null>(null);
    const dispatch = useDispatch();

    const setSelectedAdTemplate = (ad: Ad) => {
        _setSelectedAdTemplate(ad);
        if(diagramStarter === null) {
            dispatch(setDiagramStarter({diagramStarter: ad}));
            return;
        }
        //-- setDiagramStarter only if different!
        if(diagramStarter.key !== ad.key) {
            dispatch(setDiagramStarter({diagramStarter: ad}));
            return;
        }
    }

    return (
        <List
            sx={{width: '100%', minWidth: '100px'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<AdTemplateListSubheader />}
        >
            <Divider/>
            {ads.filter((currentAd) => currentAd.isTemplate)
                .map((currentAd) =>
                    <AdTemplateListItem
                        key={currentAd.key}
                        currentAd={currentAd}
                        onClick={() => setSelectedAdTemplate(currentAd)}
                        selected={currentAd.key === selectedAdTemplate?.key}
                    />)}
        </List>
    );
};

export default AdTemplateList;