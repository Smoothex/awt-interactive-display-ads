import React from 'react';
import {Rnd} from 'react-rnd';
import {Box, Typography} from "@mui/material";

const AdEditor = () => {
  return (
      <div style={{width: "100%", height: "100%"}}>
        <div style={{width: "1280px", height: "720px", backgroundColor: "#ecf0f1"}}>
          <Rnd
              default={{
                x: 640,
                y: 0,
                width: 640,
                height: 360,
              }}
              style={{
                backgroundColor: "white",
                border: "1px solid lightgray"
              }}
              bounds="parent"
              lockAspectRatio={true}
              disableDragging={true}
              enableResizing={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: true,
                topLeft: false
              }}
          >
            <Box style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              color: "gray",
            }}>
              <Typography variant="subtitle1" gutterBottom>
                Minimized TV Screen
              </Typography>
            </Box>
          </Rnd>
          <Rnd
              className="ad"
              default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
              }}
              style={{
                backgroundColor: "white",
                border: "1px solid lightgray",
                opacity: 0.5,
              }}
              bounds="parent"
          >
            <Box style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              color: "gray",
            }}>
              <Typography variant="subtitle1" gutterBottom>
                Text Container
              </Typography>
            </Box>
          </Rnd>
          <Rnd
              className="ad"
              default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
              }}
              style={{
                backgroundColor: "white",
                border: "4px solid #74b9ff",
                outline: "#0984e3 solid 1px",
                outlineOffset: "-2px",
                opacity: 0.5,
              }}
              bounds="parent"
          >
            <Box style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              color: "gray",
            }}>
              <Typography variant="subtitle1" gutterBottom>
                Image Container
              </Typography>
            </Box>
          </Rnd>
        </div>
      </div>
  );
};

export default AdEditor;