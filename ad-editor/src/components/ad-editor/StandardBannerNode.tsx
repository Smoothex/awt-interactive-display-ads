import Ad from "../../ads/Ad.interface";

import {Rnd} from "react-rnd";

import {
  Box,
  Typography
} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import {
  updateAdPosition,
  updateAdSize
} from "../../features/ad/adSlice";

import {MouseEventHandler} from "react";

import {RootState} from "../../app/store";

import {pickContrastColor} from "../../util";

interface StandardBannerNodeProps {
  adKey: string,
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

function StandardBannerNode(props: StandardBannerNodeProps) {
  const {
    adKey,
    onClick,
    onMouseDown,
    selected = false,
  }: StandardBannerNodeProps = props;

  const {ads} = useSelector((store: RootState) => store.ad);
  const ad = ads.find(current => current.key === adKey) as Ad;

  const style = {
    backgroundColor: ad.props.backgroundColor,
    color: pickContrastColor(ad.props.backgroundColor as string, "#ffffff", "#000000"),
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: ad.props.backgroundColor,
    color: pickContrastColor(ad.props.backgroundColor as string, "#ffffff", "#000000"),
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
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