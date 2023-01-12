import Container, {ContainerType} from "../../ads/Container.interface";

import {Rnd} from "react-rnd";

import {removeContainer, updateContainerPosition, updateContainerSize} from "../../features/ad/adSlice";

import {Box, IconButton, Typography} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import {useDispatch} from "react-redux";

import {MouseEventHandler} from "react";

interface ContainerNodeProps {
  container: Container;
  parentKey: string;
  nodeBounds?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

export function ContainerNode(props: ContainerNodeProps) {
  const {
    container,
    parentKey,
    nodeBounds = "parent",
    onClick,
    onMouseDown,
    selected = false,
  }: ContainerNodeProps = props;

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeContainer({parentAdKey: parentKey, containerKey: container.key}));
  }

  const style = {
    backgroundColor: "white",
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: "white",
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
    opacity: 0.5,
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
        <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              color: "gray",
            }}
            onClick={onClick}
            onMouseDown={onMouseDown}
        >
          <Typography variant="subtitle1" gutterBottom>
            {container.type === ContainerType.Text &&
                "Text"
            }
            {container.type === ContainerType.Image &&
                "Image"
            }
            {container.type === ContainerType.Slideshow &&
                "Slideshow"
            }
          </Typography>
        </Box>
      </Rnd>
  );
}