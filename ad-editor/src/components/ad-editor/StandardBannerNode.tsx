import Ad from "../../ads/Ad.interface";

import {Rnd} from "react-rnd";

import {
  Box,
  Typography
} from "@mui/material";

import {useDispatch} from "react-redux";

import {
  updateAdPosition,
  updateAdSize
} from "../../features/ad/adSlice";

import {MouseEventHandler} from "react";

interface StandardBannerNodeProps {
  ad: Ad;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

function StandardBannerNode(props: StandardBannerNodeProps) {
  const {
    ad,
    onClick,
    onMouseDown,
    selected = false,
  }: StandardBannerNodeProps = props;

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

  const dispatch = useDispatch();

  return (
      <Rnd
          default={{
            x: ad.props.left,
            y: ad.props.top,
            width: ad.props.width,
            height: ad.props.height,
          }}
          onDragStop={(e, d) => {
            dispatch(updateAdPosition({key: ad.key, top: d.y, left: d.x}));
          }}
          onResize={(e, direction, ref, delta, position) => {
            dispatch(updateAdSize({key: ad.key, width: ref.offsetWidth, height: ref.offsetHeight}));
            dispatch(updateAdPosition({key: ad.key, top: position.y, left: position.x}));
          }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true
          }}
          style={selected ? styleSelected : style}
          className={"standard-banner-" + ad.key}
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
            Standard Banner
          </Typography>
        </Box>
      </Rnd>
  );
}

export default StandardBannerNode;