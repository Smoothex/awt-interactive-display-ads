import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Container from "../../ads/Container.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {Add, Delete, Slideshow} from "@mui/icons-material";

import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import {updateContainer} from "../../features/ad/adSlice";

import {useState} from "react";

import ColorPickerField from "./ColorPickerField";

export const SlideshowContainerProperties = () => {
  const {containers} = useSelector((store: RootState) => store.ad);
  const {diagramSelectedNode} = useSelector((store: RootState) => store.diagram);
  const currentContainer = containers.entities[diagramSelectedNode!.key] as Container;
  const dispatch = useDispatch();

  const [nextImageButtons, ] = useState([
      ["red", "Red"],
      ["green", "Green"],
      ["blue", "Blue"],
      ["yellow", "Yellow"]
  ]);

  const [newImageAddress, setNewImageAddress] = useState<string>("");

  return (
      <>
        <PropertiesPanelHeader icon={Slideshow} label={"Slideshow Container"}/>
        <Box style={{padding: "0.5rem"}}>
          <SimpleTextField label="Width" getValue={() => currentContainer.props.width.toString()} disabled={true}/>
          <SimpleTextField label="Height" getValue={() => currentContainer.props.height.toString()} disabled={true}/>
          <SimpleTextField label="Top" getValue={() => currentContainer.props.top.toString()} disabled={true}/>
          <SimpleTextField label="Left" getValue={() => currentContainer.props.left.toString()} disabled={true}/>

          <ColorPickerField
              objectKey={currentContainer.key}
              label="Background Color"
              getCurrentColor={() => currentContainer.props.backgroundColor || ""}
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
              removeCurrentColor={() => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      backgroundColor: undefined,
                    }
                  }
                }))
              }}
          />

          <FormControl fullWidth sx={{margin: "8px 0px 4px 0px"}}>
            <InputLabel id="properties-panel-next-image-button-select-label" size="small">
              Next image button
            </InputLabel>
            <Select
                labelId="properties-panel-next-image-button-select-label"
                id="properties-panel-next-image-button-select"
                value={currentContainer.props.nextImageButton}
                label="Next image button"
                onChange={(event: SelectChangeEvent) => {
                  dispatch(updateContainer({
                    id: currentContainer.key,
                    changes: {
                      props: {
                        ...currentContainer.props,
                        nextImageButton: event.target.value,
                      }
                    }
                  }))
                }}
                size="small"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
            >
              {nextImageButtons.map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <SimpleTextField
              label="Add image here..."
              getValue={() => newImageAddress}
              setValue={(newValue: string) => setNewImageAddress(newValue)}
              endButtonIcon1={<Add/>}
              endButtonOnClick1={(event) => {
                const images = currentContainer.props.images === undefined
                    ? [newImageAddress]
                    : [...currentContainer.props.images, newImageAddress];
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      images: images
                    }
                  }
                }));
                setNewImageAddress("");
              }}
          />
          {currentContainer.props.images &&
              currentContainer.props.images.map((image, index) => (
                  <SimpleTextField
                      label={"Image " + (index + 1)}
                      getValue={() => image}
                      disabled={true}
                      endButtonIcon1={<Delete/>}
                      endButtonOnClick1={(event) => {
                        const images = currentContainer.props.images!.filter((_, i) => i !== index); // filter based on index
                        dispatch(updateContainer({
                          id: currentContainer.key,
                          changes: {
                            props: {
                              ...currentContainer.props,
                              images: images
                            }
                          }
                        }))
                      }}
                  />
              ))
          }
        </Box>
      </>
  );
};