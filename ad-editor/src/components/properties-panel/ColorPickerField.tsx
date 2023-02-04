import {
  MouseEvent,
  useState
} from 'react';

import {Popover} from "@mui/material";

import {
  ColorResult,
  PhotoshopPicker
} from "react-color";

import SimpleTextField from "./SimpleTextField";

import {
  FormatColorFill,
  FormatColorReset,
  Square
} from "@mui/icons-material";

interface Props {
  objectKey: string;
  label: string;
  getCurrentColor: () => string;
  setCurrentColor: (newColor: string) => void;
  removeCurrentColor: () => void;
}

const ColorPickerField = (props: Props) => {
  const {
    objectKey,
    label,
    getCurrentColor,
    setCurrentColor,
    removeCurrentColor
  } = props;

  //-- An HTML element, or a function that returns one. It's used to set the position of the popover.
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open: boolean = Boolean(anchorEl);
  const id: string | undefined = open ? "properties-panel-background-color-" + objectKey : undefined;
  const [initialColor, setInitialColor] = useState<string | undefined>(undefined);

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    //-- Remember the initial color, so that we can reset it on cancel
    setInitialColor(getCurrentColor());
    setAnchorEl(event.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  }

  const handleColorAccept = () => {
    handlePopoverClose();
  }

  const handleColorCancel = () => {
    setCurrentColor(initialColor || "");
    handlePopoverClose();
  }

  return (
      <>
        <SimpleTextField
            label={label}
            getValue={getCurrentColor}
            disabled={true}
            startButtonIcon={<Square style={{color: getCurrentColor()}}/>}
            endButtonIcon1={<FormatColorFill/>}
            endButtonOnClick1={handlePopoverOpen}
            endButtonIcon2={<FormatColorReset/>}
            endButtonOnClick2={removeCurrentColor}
        />
        {/* Popover with ColorPicker */}
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
        >
          <PhotoshopPicker
              color={getCurrentColor()}
              onChange={handleColorChange}
              onChangeComplete={handleColorChange}
              onAccept={handleColorAccept}
              onCancel={handleColorCancel}
          />
        </Popover>
      </>
  );
};

export default ColorPickerField;