import {useEffect, useState} from 'react';
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
  const {lastCreatedAdKey} = useSelector((store: RootState) => store.ad);
  const {lastRemovedAdKey} = useSelector((store: RootState) => store.ad);
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const [selectedAdTemplate, _setSelectedAdTemplate] = useState<Ad | null>(null);
  const dispatch = useDispatch();

  const setSelectedAdTemplate = (ad: Ad | null) => {
    if (diagramStarter === null || ad === null) {
      _setSelectedAdTemplate(ad);
      dispatch(setDiagramStarter({diagramStarter: ad}));
      return;
    }
    //-- setDiagramStarter only if different!
    if (diagramStarter.key !== ad.key) {
      _setSelectedAdTemplate(ad);
      dispatch(setDiagramStarter({diagramStarter: ad}));
      return;
    }
  };

  //-- Listen for changes on lastCreatedAdKey and update the selection on change
  useEffect(() => {
    let lastCreatedAd: Ad | undefined = ads.find((ad) => ad.key === lastCreatedAdKey);
    if (lastCreatedAd !== undefined) {
      setSelectedAdTemplate(lastCreatedAd);
    }
  }, [lastCreatedAdKey]);

  //-- Listen for changes on lastRemovedAdKey and update the selection on change
  useEffect(() => {
    if (selectedAdTemplate !== null && selectedAdTemplate.key === lastRemovedAdKey) {
      setSelectedAdTemplate(null);
    }
  }, [lastRemovedAdKey]);

  return (
      <List
          sx={{width: '100%', minWidth: '100px'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<AdTemplateListSubheader/>}
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