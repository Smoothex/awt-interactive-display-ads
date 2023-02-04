import Container, {
  ContainerType
} from "../../ads/Container.interface";

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

import {
  MouseEventHandler,
  useRef
} from "react";

import {store} from "../../app/store";

import ContentEditable from "react-contenteditable";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {Carousel} from 'react-responsive-carousel';

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

  const container = selectContainerById(store.getState().ad.containers, containerKey) as Container;
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeContainer({parentAdKey: parentKey, containerKey: containerKey}));
  }

  const style = {
    backgroundColor: container.props.backgroundColor,
    border: "1px solid lightgray"
  };

  const styleSelected = {
    backgroundColor: container.props.backgroundColor,
    border: "4px solid #74b9ff",
    outline: "#0984e3 solid 1px",
    outlineOffset: "-2px",
  };

  const contentEditable = useRef<HTMLElement>(null);

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
          cancel={".text-container-editable-div"}
      >
        <IconButton
            size="small"
            style={{
              position: 'absolute',
              right: "0",
              zIndex: 10
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
                }}
                onClick={onClick}
                onMouseDown={onMouseDown}
            >
              <ContentEditable
                  innerRef={contentEditable}
                  html={container.props.text || ""} // innerHTML of the editable div
                  placeholder={"Enter text here..."}
                  disabled={false} // use true to disable editing
                  onChange={(event) => {
                    dispatch(updateContainer({
                      id: container.key,
                      changes: {
                        props: {
                          ...container.props,
                          text: event.target.value,
                        }
                      }
                    }))
                  }
                  } // handle innerHTML change
                  style={{
                    color: container.props.color,
                    textAlign: container.props.textAlign,
                    fontWeight: container.props.fontWeight,
                    fontStyle: container.props.fontStyle,
                    textDecoration: container.props.textDecoration,
                    fontFamily: container.props.fontFamily,
                    fontSize: container.props.fontSize,
                    maxHeight: container.props.height - 8, // limit the height of the editable content
                    overflowY: "scroll",
                    overflow: "hidden",
                    scrollbarWidth: "thin",
                    cursor: "auto",
                    padding: "0 3px"
                  }}
                  className={"text-container-editable-div"}
                  spellCheck={false}
              />
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
              {container.props.image === undefined || container.props.image === ""
                  ? <Typography variant="subtitle1" gutterBottom>
                    Image
                  </Typography>
                  : <img
                      src={container.props.image}
                      alt={""}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        height: "auto",
                        pointerEvents: "none"
                      }}
                  />
              }
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
              {container.props.images === undefined || container.props.images.length === 0
                  ? <Typography variant="subtitle1" gutterBottom>
                    Slideshow
                  </Typography>
                  : <Carousel showArrows={true} showThumbs={false}>
                    {container.props.images.map((image, index) => (
                        <Box key={index} style={{height: container.props.height - 8}}>
                          <img

                              src={image}
                              alt={"Image " + (index + 1)}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "auto",
                                height: "auto",
                                pointerEvents: "none"
                              }}
                          />
                        </Box>
                    ))}
                  </Carousel>
              }
            </Box>
        }
      </Rnd>
  );
}
