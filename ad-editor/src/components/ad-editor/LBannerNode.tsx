import Ad from "../../ads/Ad.interface";

import {Rnd} from "react-rnd";

import {
  Box,
  Typography
} from "@mui/material";

import {MouseEventHandler} from "react";

import {useDispatch} from "react-redux";

import {
  selectAdById,
  updateAd,
} from "../../features/ad/adSlice";

import {store} from "../../app/store";

interface LBannerNodeProps {
  adKey: string,
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

function LBannerNode(props: LBannerNodeProps) {
  const {
    adKey,
    onClick,
    onMouseDown,
    selected = false,
  }: LBannerNodeProps = props;

  const ad: Ad | undefined = selectAdById(store.getState().ad.ads, adKey);

  const dispatch = useDispatch();

  if (ad === undefined) return <></>

  const style = {
    backgroundColor: "#ecf0f1",
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: "#ecf0f1",
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
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
            style={{
              backgroundColor: ad.props.backgroundColor ? ad.props.backgroundColor : "#ffffff",
              border: "1px solid lightgray"
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