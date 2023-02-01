import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Container from "../../ads/Container.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {ArticleOutlined} from "@mui/icons-material";

import {Box} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import ColorPickerButton from "./ColorPickerButton";

import {updateContainer} from "../../features/ad/adSlice";

export const TextContainerProperties = () => {
  const {containers} = useSelector((store: RootState) => store.ad);
  const {diagramSelectedNode} = useSelector((store: RootState) => store.diagram);
  const currentContainer = containers.entities[diagramSelectedNode!.key] as Container;
  const dispatch = useDispatch();

  return (
      <>
        <PropertiesPanelHeader icon={ArticleOutlined} label={"Text Container"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentContainer.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentContainer.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentContainer.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentContainer.props.left.toString()} disabled={true}/>
          <ColorPickerButton
              objectKey={currentContainer.key}
              label="Background Color"
              getCurrentColor={() => currentContainer.props.backgroundColor as string}
              setCurrentColor={(color) => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      backgroundColor: color,
                    }
                  }
                }))
              }}
          />
        </Box>
      </>
  );
};