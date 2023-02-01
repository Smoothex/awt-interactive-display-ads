import {useEffect, useState} from 'react';
import {
  Divider,
  List,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../../app/store";
import AdInstanceListSubheader from "./AdInstanceListSubheader";
import AdInstanceListItem from "./AdInstanceListItem";
import Ad from "../../ads/Ad.interface";
import {setDiagramStarter} from "../../features/diagram/diagramSlice";
import {selectAllAds} from "../../features/ad/adSlice";

const AdInstanceList = () => {
  const adIds = useSelector((store: RootState) => store.ad.ads.ids);
  const [ads, setAds] = useState<Ad[]>([]);
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const [selectedAdInstance, _setSelectedAdInstance] = useState<Ad | null>(null);
  const dispatch = useDispatch();

  const setSelectedAdInstance = (ad: Ad | null) => {
    if (diagramStarter === null || ad === null) {
      _setSelectedAdInstance(ad);
      dispatch(setDiagramStarter({diagramStarter: ad}));
      return;
    }
    //-- setDiagramStarter only if different!
    if (diagramStarter.key !== ad.key) {
      _setSelectedAdInstance(ad);
      dispatch(setDiagramStarter({diagramStarter: ad}));
      return;
    }
  }

  useEffect(() => {
    const ads = selectAllAds(store.getState().ad.ads);
    setAds(ads);
  }, [adIds]);

  return (
      <List
          sx={{width: '100%', minWidth: '100px'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<AdInstanceListSubheader/>}
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