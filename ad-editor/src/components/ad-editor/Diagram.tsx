import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  RootState,
  store
} from "../../app/store";

import {AdType} from "../../ads/Ad.interface";

import StandardBannerNode from "./StandardBannerNode";

import LBannerNode from "./LBannerNode";

import DiagramSpeedDial from "./DiagramSpeedDial";

import {ContainerNode} from "./ContainerNode";

import {setDiagramSelectedNode} from "../../features/diagram/diagramSlice";

import {Box} from "@mui/material";

import {selectAllAdContainerTuples} from "../../features/ad/adSlice";

import AdContainer from "../../ads/AdContainer.interface";

import Container from "../../ads/Container.interface";

const Diagram = () => {
  const {
    diagramStarter,
    diagramSelectedNode,
  } = useSelector((store: RootState) => store.diagram);

  const allTuples: AdContainer[] = selectAllAdContainerTuples(store.getState().ad.adContainerTuples);

  const {containers} = useSelector((store: RootState) => store.ad);

  const dispatch = useDispatch();

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
                  onMouseDown={() => {
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
                  onMouseDown={() => {
                    dispatch(setDiagramSelectedNode({selectedNode: diagramStarter}));
                  }}
                  selected={diagramStarter.key === diagramSelectedNode?.key}
              />
          }
          {diagramStarter &&
              allTuples
                  .filter((adContainerPair) => adContainerPair.adKey === diagramStarter.key)
                  .map((adContainerPair) => containers.entities[adContainerPair.containerKey])
                  .filter((current): current is Container => !!current)
                  .map((container) =>
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
                          onMouseDown={() => {
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