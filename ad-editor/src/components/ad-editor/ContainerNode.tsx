import Container, {ContainerType} from "../../ads/Container.interface";

import {Rnd} from "react-rnd";

import {
  removeContainer,
  selectContainerById,
  updateContainer,
} from "../../features/ad/adSlice";

import {
  Box,
  IconButton,
  Typography
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import {useDispatch} from "react-redux";

import {MouseEventHandler} from "react";

import {pickContrastColor} from "../../util";

import {store} from "../../app/store";

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

  const container: Container | undefined = selectContainerById(store.getState().ad.containers, containerKey);
  const dispatch = useDispatch();

  if (container === undefined) return <></>

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

  return (
      <Rnd
          default={{
            x: container.props.left,
            y: container.props.top,
            width: container.props.width,
            height: container.props.height,
          }}
          onDragStop={(e, d) => {
            dispatch(updateContainer({
              id: container.key,
              changes: {
                props: {
                  ...container.props,
                  top: d.y,
                  left: d.x,
                }
              }
            }));
          }}
          onResize={(e, direction, ref, delta, position) => {
            dispatch(updateContainer({
              id: container.key,
              changes: {
                props: {
                  ...container.props,
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  top: position.y,
                  left: position.x,
                }
              }
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