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

interface StandardBannerNodeProps {
  ad: Ad;
}

function StandardBannerNode(props: StandardBannerNodeProps) {
  const {
    ad
  }: StandardBannerNodeProps = props;

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
            Standard Banner
          </Typography>
        </Box>
      </Rnd>
  );
}

export default StandardBannerNode;