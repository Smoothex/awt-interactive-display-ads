import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {CallToActionOutlined} from "@mui/icons-material";

import {Box} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import {updateAd} from "../../features/ad/adSlice";

import Ad from "../../ads/Ad.interface";

import ColorPickerField from "./ColorPickerField";

export const StandardBannerProperties = () => {
  const {ads} = useSelector((store: RootState) => store.ad);
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const currentAd = ads.entities[diagramStarter!.key] as Ad;
  const dispatch = useDispatch();

  return (
      <>
        <PropertiesPanelHeader icon={CallToActionOutlined} label={"Standard Banner"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentAd.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentAd.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentAd.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentAd.props.left.toString()} disabled={true}/>

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