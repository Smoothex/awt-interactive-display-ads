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

const HomeScreen = () => {

    return (
        <ReflexContainer orientation="vertical">
            {/* Left split element for the ad templates and ad instances */}
            <ReflexElement flex={0.2} minSize={300}>
                <ReflexContainer orientation="horizontal">
                    <ReflexElement>
                        <AdTemplateList />
                    </ReflexElement>
                    <ReflexSplitter/>
                    <ReflexElement>
                        <AdInstanceList />
                    </ReflexElement>
                </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter/>
            {/* Right split element for the ad editor */}
            <ReflexElement>
                <AdEditor />
            </ReflexElement>
        </ReflexContainer>
    );
};

export default HomeScreen;