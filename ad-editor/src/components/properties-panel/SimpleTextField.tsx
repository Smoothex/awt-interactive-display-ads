import React from 'react';

import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  getValue: () => string;
  setValue?: (newValue: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
}

const SimpleTextField = (props: Props) => {
  const {
    label,
    getValue,
    setValue,
    disabled = false,
    multiline = false,
    minRows
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
      />
  );
};

export default SimpleTextField;