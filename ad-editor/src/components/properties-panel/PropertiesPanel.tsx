import {useSelector} from "react-redux";

import {RootState} from "../../app/store";

import {
  Box
} from "@mui/material";

import {AdType} from "../../ads/Ad.interface";

import {ContainerType} from "../../ads/Container.interface";

import {StandardBannerProperties} from "./StandardBannerProperties";

import {LBannerProperties} from "./LBannerProperties";

import {TextContainerProperties} from "./TextContainerProperties";

import {ImageContainerProperties} from "./ImageContainerProperties";

import {SlideshowContainerProperties} from "./SlideshowContainerProperties";

export const PropertiesPanel = () => {
  const {diagramStarter, diagramSelectedNode} = useSelector((store: RootState) => store.diagram);

  return (
      <Box>
        {((diagramStarter && diagramStarter.type === AdType.StandardBanner && diagramSelectedNode === null)
            || (diagramSelectedNode && diagramSelectedNode.type === AdType.StandardBanner)) &&
            <StandardBannerProperties/>}
        {((diagramStarter && diagramStarter.type === AdType.LBanner && diagramSelectedNode === null)
            || (diagramSelectedNode && diagramSelectedNode.type === AdType.LBanner)) &&
            <LBannerProperties/>}
        {diagramSelectedNode && diagramSelectedNode.type === ContainerType.Text &&
            <TextContainerProperties/>}
        {diagramSelectedNode && diagramSelectedNode.type === ContainerType.Image &&
            <ImageContainerProperties/>}
        {diagramSelectedNode && diagramSelectedNode.type === ContainerType.Slideshow &&
            <SlideshowContainerProperties/>}
      </Box>
  );
};