import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import {AdType} from "../../ads/Ad.interface";

import StandardBannerNode from "./StandardBannerNode";

import LBannerNode from "./LBannerNode";

import DiagramSpeedDial from "./DiagramSpeedDial";

import {ContainerNode} from "./ContainerNode";

import {useEffect} from "react";

import {
  setDiagramSelectedNode,
  setDiagramStarter
} from "../../features/diagram/diagramSlice";

import {Box} from "@mui/material";

const Diagram = () => {
  const {
    diagramStarter,
    diagramContainers,
    diagramSelectedNode,
  } = useSelector((store: RootState) => store.diagram);

  const {
    ads,
    lastCreatedContainerKey,
    lastRemovedContainerKey
  } = useSelector((store: RootState) => store.ad);

  const dispatch = useDispatch();

  //-- When a container is created/deleted the change is not automatically propagated to diagramStarter.
  //-- So here we fetch the diagramStarter again from the ad slice (where it is actualized) and update it in the diagram slice.
  useEffect(() => {
    if (diagramStarter === null) {
      return;
    }
    const updatedDiagramStarter = ads.find(ad => ad.key === diagramStarter.key);
    if (updatedDiagramStarter === undefined) {
      return;
    }
    dispatch(setDiagramStarter({diagramStarter: updatedDiagramStarter}));
  }, [lastCreatedContainerKey, lastRemovedContainerKey]);

  return (
      <>
        <Box
            style={{
              width: "1280px",
              height: "720px",
              backgroundColor: "#ecf0f1"
            }}
            onClick={() => dispatch(setDiagramSelectedNode({selectedNode: null}))}
        >
          {diagramStarter && diagramStarter.type === AdType.StandardBanner &&
              <StandardBannerNode
                  key={diagramStarter.key}
                  adKey={diagramStarter.key}
                  onClick={(event) => {
                    dispatch(setDiagramSelectedNode({selectedNode: diagramStarter}));
                    event.stopPropagation();
                  }}
                  onMouseDown={(event) => {
                    dispatch(setDiagramSelectedNode({selectedNode: diagramStarter}));
                  }}
                  selected={diagramStarter.key === diagramSelectedNode?.key}
              />
          }
          {diagramStarter && diagramStarter.type === AdType.LBanner &&
              <LBannerNode
                  key={diagramStarter.key}
                  adKey={diagramStarter.key}
                  onClick={(event) => {
                    dispatch(setDiagramSelectedNode({selectedNode: diagramStarter}));
                    event.stopPropagation();
                  }}
                  onMouseDown={(event) => {
                    dispatch(setDiagramSelectedNode({selectedNode: diagramStarter}));
                  }}
                  selected={diagramStarter.key === diagramSelectedNode?.key}
              />
          }
          {diagramStarter && diagramContainers.length > 0 &&
              diagramContainers.map((container) =>
                  <ContainerNode
                      key={container.key}
                      containerKey={container.key}
                      parentKey={diagramStarter.key}
                      nodeBounds={diagramStarter.type === AdType.StandardBanner
                          ? ".standard-banner-" + diagramStarter.key
                          : ".l-banner-" + diagramStarter.key}
                      onClick={(event) => {
                        dispatch(setDiagramSelectedNode({selectedNode: container}));
                        event.stopPropagation();
                      }}
                      onMouseDown={(event) => {
                        dispatch(setDiagramSelectedNode({selectedNode: container}));
                      }}
                      selected={container.key === diagramSelectedNode?.key}
                  />
              )
          }
        </Box>
        {diagramStarter &&
            <DiagramSpeedDial/>
        }
      </>
  );
}

export default Diagram;