import {
  MouseEvent,
  useState
} from 'react';

import {
  Button,
  Popover
} from "@mui/material";

import {pickContrastColor} from "../../util";

import {
  ColorResult,
  PhotoshopPicker
} from "react-color";

interface Props {
  objectKey: string;
  label: string;
  getCurrentColor: () => string;
  setCurrentColor: (newColor: string) => void;
}

const ColorPickerButton = (props: Props) => {
  const {
    objectKey,
    label,
    getCurrentColor,
    setCurrentColor
  } = props;

  //-- An HTML element, or a function that returns one. It's used to set the position of the popover.
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open: boolean = Boolean(anchorEl);
  const id: string | undefined = open ? "properties-panel-background-color-" + objectKey : undefined;
  const currentColor = getCurrentColor();

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  }

  return (
      <>
        <Button
            aria-details={id}
            variant="contained"
            onClick={handlePopoverOpen}
            style={{
              backgroundColor: currentColor,
              color: pickContrastColor(currentColor, "#ffffff", "#000000"),
              margin: "8px 0px 4px 0px"
            }}
            fullWidth
        >
          {label}
        </Button>

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
              color={currentColor}
              onChange={handleColorChange}
              onChangeComplete={handleColorChange}
              onAccept={handlePopoverClose}
              onCancel={handlePopoverClose}
          />
        </Popover>
      </>
  );
};

export default ColorPickerButton;