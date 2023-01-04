import React from 'react';
import { Rnd } from 'react-rnd';

const AdEditor = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
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
                    width: 160,
                    height: 100,
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