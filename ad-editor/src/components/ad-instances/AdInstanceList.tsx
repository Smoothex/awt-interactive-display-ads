import {useState} from 'react';
import {
    Divider,
    List,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import AdInstanceListSubheader from "./AdInstanceListSubheader";
import AdInstanceListItem from "./AdInstanceListItem";
import Ad from "../../ads/Ad.interface";
import {setDiagramStarter} from "../../features/diagram/diagramSlice";

const AdInstanceList = () => {
    const {ads} = useSelector((store: RootState) => store.ad);
    const {diagramStarter} = useSelector((store: RootState) => store.diagram);
    const [selectedAdInstance, _setSelectedAdInstance] = useState<Ad | null>(null);
    const dispatch = useDispatch();

    const setSelectedAdInstance = (ad: Ad) => {
        _setSelectedAdInstance(ad);
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
            subheader={<AdInstanceListSubheader />}
        >
            <Divider/>
            {ads.filter((currentAd) => !currentAd.isTemplate)
                .map((currentAd) =>
                    <AdInstanceListItem
                        key={currentAd.key}
                        currentAd={currentAd}
                        onClick={() => setSelectedAdInstance(currentAd)}
                        selected={currentAd.key === selectedAdInstance?.key}
                    />)}
        </List>
    );
};

export default AdInstanceList;