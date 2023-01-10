import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Icon,
  Toolbar,
  Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ImageAspectRatio} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

const NavBar = () => {
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);

  return (
      <>
        <CssBaseline/>
        <AppBar>
          <Toolbar>
            <Icon sx={{margin: "8px"}}>
              <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="Logo"
                   style={{width: "24px", height: "24px"}}/>
            </Icon>
            <Typography variant="h6" component="div">
              Ad Editor
            </Typography>
            {diagramStarter &&
                <Box
                    sx={{flexGrow: 1}}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                >
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <ImageAspectRatio/>
                  </IconButton>
                  <Typography variant="h6" color="inherit" component="div">
                    {diagramStarter.name}
                  </Typography>
                </Box>
            }
          </Toolbar>
        </AppBar>
        <Toolbar/>
      </>
  );
};

export default NavBar;