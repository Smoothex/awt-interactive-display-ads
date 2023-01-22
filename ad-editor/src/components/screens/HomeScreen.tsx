import React from 'react';
import 'react-reflex/styles.css';
import {
  ReflexContainer,
  ReflexElement,
  ReflexSplitter
} from "react-reflex";
import AdTemplateList from "../ad-templates/AdTemplateList";
import AdInstanceList from "../ad-instances/AdInstanceList";
import AdEditor from "../ad-editor/AdEditor";
import {PropertiesPanel} from "../properties-panel/PropertiesPanel";

const HomeScreen = () => {

  return (
      <ReflexContainer orientation="vertical">

        {/* Left split element for the ad templates and ad instances */}
        <ReflexElement flex={0.15} minSize={300}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement>
              <AdTemplateList/>
            </ReflexElement>
            <ReflexSplitter/>
            <ReflexElement>
              <AdInstanceList/>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter/>

        {/* Middle split element for the ad editor */}
        <ReflexElement>
          <AdEditor/>
        </ReflexElement>

        <ReflexSplitter/>

        {/* Right split element for the properties panel */}
        <ReflexElement flex={0.15} minSize={300}>
          <PropertiesPanel/>
        </ReflexElement>

      </ReflexContainer>
  );
};

export default HomeScreen;