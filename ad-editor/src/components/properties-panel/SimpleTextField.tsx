import React, {
  MouseEventHandler,
  ReactNode
} from 'react';

import TextField from "@mui/material/TextField";

import {
  IconButton,
  InputAdornment
} from "@mui/material";

interface Props {
  label: string;
  getValue: () => string;
  setValue?: (newValue: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  startButtonIcon?: ReactNode,
  startButtonOnClick?: MouseEventHandler
  endButtonIcon1?: ReactNode,
  endButtonOnClick1?: MouseEventHandler,
  endButtonIcon2?: ReactNode,
  endButtonOnClick2?: MouseEventHandler
}

const SimpleTextField = (props: Props) => {
  const {
    label,
    getValue,
    setValue,
    disabled = false,
    multiline = false,
    minRows,
    startButtonIcon,
    startButtonOnClick,
    endButtonIcon1,
    endButtonOnClick1,
    endButtonIcon2,
    endButtonOnClick2,
  } = props;

  return (
      <TextField
          label={label}
          type="text"
          value={getValue()}
          onChange={(event) => {
            if (setValue)
              setValue(event.target.value);
          }}
          disabled={disabled}
          fullWidth
          size="small"
          margin="dense"
          multiline={multiline}
          minRows={minRows}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  {startButtonIcon &&
                      <IconButton edge="start" onClick={startButtonOnClick}>
                        {startButtonIcon}
                      </IconButton>
                  }
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                  {endButtonIcon1 &&
                      <IconButton edge="end" onClick={endButtonOnClick1}>
                        {endButtonIcon1}
                      </IconButton>
                  }
                  {endButtonIcon2 &&
                      <IconButton edge="end" onClick={endButtonOnClick2}>
                        {endButtonIcon2}
                      </IconButton>
                  }
                </InputAdornment>
            )
          }}
      />
  );
};

export default SimpleTextField;