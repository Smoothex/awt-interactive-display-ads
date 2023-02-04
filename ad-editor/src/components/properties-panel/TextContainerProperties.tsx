import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import Container from "../../ads/Container.interface";

import {PropertiesPanelHeader} from "./PropertiesPanelHeader";

import {ArticleOutlined} from "@mui/icons-material";

import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import SimpleTextField from "./SimpleTextField";

import {updateContainer} from "../../features/ad/adSlice";

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import FormatBoldIcon from '@mui/icons-material/FormatBold';

import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

import {useState} from "react";

import ColorPickerField from "./ColorPickerField";

export const TextContainerProperties = () => {
  const {containers} = useSelector((store: RootState) => store.ad);
  const {diagramSelectedNode} = useSelector((store: RootState) => store.diagram);
  const currentContainer = containers.entities[diagramSelectedNode!.key] as Container;
  const dispatch = useDispatch();

  const [fontFamilies,] = useState([
    ["Helvetica, sans-serif", "Helvetica (sans-serif)"],
    ["Arial, sans-serif", "Arial (sans-serif)"],
    ["Arial Black, sans-serif", "Arial Black (sans-serif)"],
    ["Verdana, sans-serif", "Verdana (sans-serif)"],
    ["Tahoma,sans-serif", "Tahoma (sans-serif)"],
    ["Trebuchet MS, sans-serif", "Trebuchet MS (sans-serif)"],
    ["Impact, sans-serif", "Impact (sans-serif)"],
    ["Gill Sans, sans-serif", "Gill Sans (sans-serif)"],
    ["Times New Roman, serif", "Times New Roman (serif)"],
    ["Georgia, serif", "Georgia (serif)"],
    ["Palatino, serif", "Palatino (serif)"],
    ["Baskerville, serif", "Baskerville (serif)"],
    ["Andalé Mono, monospace", "Andalé Mono (monospace)"],
    ["Courier, monospace", "Courier (monospace)"],
    ["Lucida, monospace", "Lucida (monospace)"],
    ["Monaco, monospace", "Monaco (monospace)"],
    ["Bradley Hand, cursive", "Bradley Hand (cursive)"],
    ["Brush Script MT, cursive", "Brush Script MT (cursive)"],
    ["Luminari, fantasy", "Luminari (fantasy)"],
    ["Comic Sans MS, cursive", "Comic Sans MS (cursive)"],
  ]);

  return (
      <>
        <PropertiesPanelHeader icon={ArticleOutlined} label={"Text Container"}/>
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

          <ColorPickerField
              objectKey={currentContainer.key}
              label="Text Color"
              getCurrentColor={() => currentContainer.props.color || ""}
              setCurrentColor={(color) => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      color: color,
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
                      color: undefined,
                    }
                  }
                }))
              }}
          />

          <FormControl fullWidth sx={{margin: "8px 0px 4px 0px"}}>
            <InputLabel id="properties-panel-font-family-select-label" size="small">
              Font Family
            </InputLabel>
            <Select
                labelId="properties-panel-font-family-select-label"
                id="properties-panel-font-family-select"
                value={currentContainer.props.fontFamily}
                label="Font Family"
                onChange={(event: SelectChangeEvent) => {
                  dispatch(updateContainer({
                    id: currentContainer.key,
                    changes: {
                      props: {
                        ...currentContainer.props,
                        fontFamily: event.target.value,
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
              {fontFamilies.map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
              label="Font Size"
              type="number"
              value={currentContainer.props.fontSize === undefined ? 16 : currentContainer.props.fontSize.replace("px", "")}
              onChange={(event) => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      fontSize: event.target.value + "px",
                    }
                  }
                }))
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              fullWidth
              size="small"
              margin="dense"
          />

          <ToggleButtonGroup
              value={currentContainer.props.textAlign}
              exclusive
              onChange={(event, newAlignment: "left" | "center" | "right") => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      textAlign: newAlignment,
                    }
                  }
                }))
              }}
              size="small"
              aria-label="text alignment"
              fullWidth={true}
              sx={{margin: "8px 0px 4px 0px"}}
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon/>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon/>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon/>
            </ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
              value={[
                currentContainer.props.fontWeight,
                currentContainer.props.fontStyle,
                currentContainer.props.textDecoration
              ]}
              onChange={(event, newFormats: string[]) => {
                dispatch(updateContainer({
                  id: currentContainer.key,
                  changes: {
                    props: {
                      ...currentContainer.props,
                      fontWeight: newFormats.includes("bold") ? "bold" : "normal",
                      fontStyle: newFormats.includes("italic") ? "italic" : "normal",
                      textDecoration: newFormats.includes("underline") ? "underline" : "none",
                    }
                  }
                }))
              }}
              size="small"
              aria-label="text alignment"
              fullWidth={true}
              sx={{margin: "8px 0px 4px 0px"}}
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon/>
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon/>
            </ToggleButton>
            <ToggleButton value="underline" aria-label="underline">
              <FormatUnderlinedIcon/>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </>
  );
};