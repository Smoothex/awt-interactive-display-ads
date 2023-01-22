import {ContainerType} from "../../ads/Container.interface";

import {Rnd} from "react-rnd";

import {
  removeContainer,
  updateContainerPosition,
  updateContainerSize
} from "../../features/ad/adSlice";

import {
  Box,
  IconButton,
  Typography
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import {
  useDispatch,
  useSelector
} from "react-redux";

import {MouseEventHandler} from "react";

import {pickContrastColor} from "../../util";

import {RootState} from "../../app/store";

import Ad from "../../ads/Ad.interface";

interface ContainerNodeProps {
  containerKey: string;
  parentKey: string;
  nodeBounds?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

export function ContainerNode(props: ContainerNodeProps) {
  const {
    containerKey,
    parentKey,
    nodeBounds = "parent",
    onClick,
    onMouseDown,
    selected = false,
  }: ContainerNodeProps = props;

  const {ads} = useSelector((store: RootState) => store.ad);
  const ad = ads.find(current => current.key === parentKey) as Ad;
  const container = ad.props.children.find(current => current.key === containerKey);

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeContainer({parentAdKey: parentKey, containerKey: containerKey}));
  }

  const backgroundColor = container && container.props.backgroundColor ? container.props.backgroundColor : "#ffffff";

  const style = {
    backgroundColor: backgroundColor,
    color: pickContrastColor(backgroundColor, "#ffffff", "#000000"),
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: backgroundColor,
    color: pickContrastColor(backgroundColor, "#ffffff", "#000000"),
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
  };

  if (container === undefined)
    return <></>

  return (
      <Rnd
          default={{
            x: container.props.left,
            y: container.props.top,
            width: container.props.width,
            height: container.props.height,
          }}
          onDragStop={(e, d) => {
            dispatch(updateContainerPosition({
              parentAdKey: parentKey,
              containerKey: container.key,
              top: d.y,
              left: d.x
            }));
          }}
          onResize={(e, direction, ref, delta, position) => {
            dispatch(updateContainerSize({
              parentAdKey: parentKey,
              containerKey: container.key,
              width: ref.offsetWidth,
              height: ref.offsetHeight
            }));
            dispatch(updateContainerPosition({
              parentAdKey: parentKey,
              containerKey: container.key,
              top: position.y,
              left: position.x
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
          bounds={nodeBounds}
      >
        <IconButton
            size="small"
            style={{
              position: 'absolute',
              right: "0",
            }}
            onClick={() => handleRemove()}
        >
          <CloseIcon fontSize="small"/>
        </IconButton>
        {container.type === ContainerType.Text &&
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
              {"text" in container.props
                  ?
                  <Typography variant="subtitle1" gutterBottom>
                    container.props.text
                  </Typography>
                  :
                  <Typography variant="subtitle1" gutterBottom>
                    Text
                  </Typography>
              }
            </Box>
        }
        {container.type === ContainerType.Image &&
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
                Image
              </Typography>
            </Box>
        }
        {container.type === ContainerType.Slideshow &&
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
                Slideshow
              </Typography>
            </Box>
        }
      </Rnd>
  );
}