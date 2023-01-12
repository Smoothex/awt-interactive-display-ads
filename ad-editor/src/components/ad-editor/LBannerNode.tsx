import Ad from "../../ads/Ad.interface";

import {Rnd} from "react-rnd";

import {
  Box,
  Typography
} from "@mui/material";

import React, {MouseEventHandler} from "react";

import {useDispatch} from "react-redux";

import {
  updateAdPosition,
  updateAdSize
} from "../../features/ad/adSlice";

interface LBannerNodeProps {
  ad: Ad;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

function LBannerNode(props: LBannerNodeProps) {
  const {
    ad,
    onClick,
    onMouseDown,
    selected = false,
  }: LBannerNodeProps = props;

  const dispatch = useDispatch();

  const style = {
    backgroundColor: "white",
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: "white",
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
    opacity: 0.5,
  };

  return (
      <>
        <Rnd
            default={{
              x: 0,
              y: 0,
              width: 1280,
              height: 720,
            }}
            disableDragging={true}
            enableResizing={{
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
            className={"l-banner-" + ad.key}
            bounds="parent"
        >
        </Rnd>
        <Rnd
            default={{
              x: ad.props.left,
              y: ad.props.top,
              width: ad.props.width,
              height: ad.props.height,
            }}
            onResize={(e, direction, ref, delta, position) => {
              dispatch(updateAdSize({key: ad.key, width: ref.offsetWidth, height: ref.offsetHeight}));
              dispatch(updateAdPosition({key: ad.key, top: position.y, left: position.x}));
            }}
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
            style={selected ? styleSelected : style}
            className={"l-banner-complement" + ad.key}
            bounds="parent"
        >
          <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
                color: "gray",
              }}
              onClick={onClick}
              onMouseDown={onMouseDown}
          >
            <Typography variant="subtitle1" gutterBottom>
              Minimized TV Screen
            </Typography>
          </Box>
        </Rnd>
      </>
  );
}

export default LBannerNode;