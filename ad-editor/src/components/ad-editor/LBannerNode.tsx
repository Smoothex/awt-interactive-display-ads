import Ad from "../../ads/Ad.interface";
import {Rnd} from "react-rnd";
import {
  Box,
  Typography
} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {
  updateAdPosition,
  updateAdSize
} from "../../features/ad/adSlice";

interface LBannerNodeProps {
  ad: Ad;
}

function LBannerNode(props: LBannerNodeProps) {
  const {
    ad
  }: LBannerNodeProps = props;

  const dispatch = useDispatch();

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
              backgroundColor: "#ecf0f1",
            }}
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
            style={{
              backgroundColor: "white",
              border: "1px solid lightgray"
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
              Minimized TV Screen
            </Typography>
          </Box>
        </Rnd>
      </>
  );
}

export default LBannerNode;