import {useEffect, useState} from 'react';
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
  const {lastCreatedAdKey} = useSelector((store: RootState) => store.ad);
  const {lastRemovedAdKey} = useSelector((store: RootState) => store.ad);
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

  //-- Listen for changes on lastCreatedAdKey and update the selection on change
  useEffect(() => {
    let lastCreatedAd: Ad | undefined = ads.find((ad) => ad.key === lastCreatedAdKey);
    if (lastCreatedAd !== undefined) {
      setSelectedAdInstance(lastCreatedAd);
    }
  }, [lastCreatedAdKey]);

  //-- Listen for changes on lastRemovedAdKey and update the selection on change
  useEffect(() => {
    if (selectedAdInstance !== null && selectedAdInstance.key === lastRemovedAdKey) {
      setSelectedAdInstance(null);
    }
  }, [lastRemovedAdKey]);

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