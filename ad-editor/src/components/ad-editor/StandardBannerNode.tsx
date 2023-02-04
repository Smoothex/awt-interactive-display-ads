import Ad from "../../ads/Ad.interface";

import {Rnd} from "react-rnd";

import {
  Box,
  Typography
} from "@mui/material";

import {useDispatch} from "react-redux";

import {
  selectAdById,
  updateAd,
} from "../../features/ad/adSlice";

import {MouseEventHandler} from "react";

import {store} from "../../app/store";

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

  const ad: Ad | undefined = selectAdById(store.getState().ad.ads, adKey);

  const dispatch = useDispatch();

  if (ad === undefined) return <></>

  const style = {
    backgroundColor: ad.props.backgroundColor || "#ffffff",
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: ad.props.backgroundColor || "#ffffff",
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
  };

  return (
      <Rnd
          default={{
            x: ad.props.left,
            y: ad.props.top,
            width: ad.props.width,
            height: ad.props.height,
          }}
          onDragStop={(e, d) => {
            dispatch(updateAd({
              id: ad.key,
              changes: {
                props: {
                  ...ad.props,
                  top: d.y,
                  left: d.x,
                }
              }
            }));
          }}
          onResize={(e, direction, ref, delta, position) => {
            dispatch(updateAd({
              id: ad.key,
              changes: {
                props: {
                  ...ad.props,
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  top: position.y,
                  left: position.x
                }}
            }));
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