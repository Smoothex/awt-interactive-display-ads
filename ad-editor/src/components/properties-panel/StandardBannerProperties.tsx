import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Ad from "../../ads/Ad.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {CallToActionOutlined} from "@mui/icons-material";

import {
  Box,
} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import ColorPickerButton from "./ColorPickerButton";

import {updateAdBackgroundColor} from "../../features/ad/adSlice";

export const StandardBannerProperties = () => {
  const {ads} = useSelector((store: RootState) => store.ad);
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const currentAd = ads.find(ad => ad.key === diagramStarter!.key) as Ad;

  const dispatch = useDispatch();

  return (
      <>
        <PropertiesPanelHeader icon={CallToActionOutlined} label={"Standard Banner"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentAd.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentAd.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentAd.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentAd.props.left.toString()} disabled={true}/>
          <ColorPickerButton
              objectKey={currentAd.key}
              label="Background Color"
              getCurrentColor={() => currentAd.props.backgroundColor as string}
              setCurrentColor={(color) => dispatch(updateAdBackgroundColor({
                key: currentAd.key,
                backgroundColor: color
              }))}
          />
        </Box>
      </>
  );
};