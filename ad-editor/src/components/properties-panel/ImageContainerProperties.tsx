import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Ad from "../../ads/Ad.interface";

import TextContainer from "../../ads/TextContainer.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {ImageOutlined} from "@mui/icons-material";

import {
  Box,
} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import ColorPickerButton from "./ColorPickerButton";

import {updateContainerBackgroundColor} from "../../features/ad/adSlice";

export const ImageContainerProperties = () => {
  const {ads} = useSelector((store: RootState) => store.ad);
  const {
    diagramStarter,
    diagramSelectedNode
  } = useSelector((store: RootState) => store.diagram);
  const currentAd = ads.find(ad => ad.key === diagramStarter!.key) as Ad;
  const currentContainer = currentAd.props.children.find(current => current.key === diagramSelectedNode!.key) as TextContainer;

  const dispatch = useDispatch();

  return (
      <>
        <PropertiesPanelHeader icon={ImageOutlined} label={"Image Container"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentContainer.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentContainer.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentContainer.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentContainer.props.left.toString()} disabled={true}/>
          <ColorPickerButton
              objectKey={currentContainer.key}
              label="Background Color"
              getCurrentColor={() => currentContainer.props.backgroundColor as string}
              setCurrentColor={(color) => dispatch(updateContainerBackgroundColor({
                parentAdKey: currentAd.key,
                containerKey: currentContainer.key,
                backgroundColor: color
              }))}
          />
        </Box>
      </>
  );
};