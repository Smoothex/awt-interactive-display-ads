import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Ad from "../../ads/Ad.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {
  Tv,
  PictureInPicture
} from "@mui/icons-material";

import {
  Box,
  Divider,
} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import {updateAd} from "../../features/ad/adSlice";

import ColorPickerField from "./ColorPickerField";

export const LBannerProperties = () => {
  const {ads} = useSelector((store: RootState) => store.ad);
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const currentAd = ads.entities[diagramStarter!.key] as Ad;
  const dispatch = useDispatch();

  return (
      <>
        <PropertiesPanelHeader icon={Tv} label={"Minimized TV Screen"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentAd.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentAd.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentAd.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentAd.props.left.toString()} disabled={true}/>
        </Box>
        <Divider/>

        <PropertiesPanelHeader icon={PictureInPicture} label={"L-Banner"}/>
        <Box style={{padding: "0.5rem"}}>
          <ColorPickerField
              objectKey={currentAd.key}
              label="Background Color"
              getCurrentColor={() => currentAd.props.backgroundColor || ""}
              setCurrentColor={(color) => {
                dispatch(updateAd({
                  id: currentAd.key,
                  changes: {
                    props: {
                      ...currentAd.props,
                      backgroundColor: color
                    }
                  }
                }))
              }}
              removeCurrentColor={() => {
                dispatch(updateAd({
                  id: currentAd.key,
                  changes: {
                    props: {
                      ...currentAd.props,
                      backgroundColor: undefined,
                    }
                  }
                }))
              }}
          />
        </Box>
      </>
  );
};