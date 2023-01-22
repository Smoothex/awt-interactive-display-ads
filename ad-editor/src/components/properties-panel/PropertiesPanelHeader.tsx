import {ElementType} from "react";

import {
  Box,
  Divider,
  Typography
} from "@mui/material";

import IconButton from "@mui/material/IconButton";

interface Props {
  icon: ElementType,
  label: string
}

export const PropertiesPanelHeader = (props: Props) => {
  const {
    icon: Icon,
    label
  }: Props = props;

  return (
      <>
        <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "0.5rem"
            }}
        >
          <IconButton>
            <Icon />
          </IconButton>
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)" component="div">
            {label}
          </Typography>
        </Box>
        <Divider/>
      </>
  );
};
