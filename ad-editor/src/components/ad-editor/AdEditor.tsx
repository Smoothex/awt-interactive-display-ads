import React from 'react';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable';
import { Rnd } from 'react-rnd';

const AdEditor = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <div style={{width: "1280px", height: "720px", backgroundColor: "#ecf0f1"}}>
              <Draggable
                  bounds="parent"
                  cancel={".react-resizable-handle"}>
                  <ResizableBox
                      width={200}
                      height={200}
                      style={{backgroundColor: "#3498db"}}>
                    <span>
                    </span>
                  </ResizableBox>
              </Draggable>
            </div>
            <div style={{width: "1280px", height: "720px", backgroundColor: "#ecf0f1"}}>
              <Rnd
                  className="ad"
                  default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200,
                  }}
                  style={{backgroundColor: "red"}}
                  bounds="parent"
              >
              </Rnd>

              <Rnd
                  default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200,
                  }}
                  style={{backgroundColor: "blue"}}
                  bounds=".ad"
              >
              </Rnd>

              <Rnd
                  default={{
                    x: 960,
                    y: 0,
                    width: 320,
                    height: 200,
                  }}
                  style={{backgroundColor: "yellow"}}
                  bounds=".ad"
              >
              </Rnd>
            </div>
        </div>
    );
};

export default AdEditor;