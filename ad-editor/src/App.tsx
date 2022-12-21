import React from 'react';
import './App.css';
import {AppBar, Box, CssBaseline, Icon, Toolbar, Typography} from "@mui/material";
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

function App() {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <Icon sx={{ margin: "8px" }}>
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="Logo" style={{width: "24px", height: "24px"}}/>
                    </Icon>
                    <Typography variant="h6" component="div">
                        Ad Editor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box flex={1}>
                <ReflexContainer orientation="vertical">
                    {/* Left split element for the ad templates and ad instances */}
                    <ReflexElement flex={0.2}>
                        <ReflexContainer orientation="horizontal">
                            {/* Ad templates */}
                            <ReflexElement>
                                <div style={{ backgroundColor: "green"}}>
                                    <label>
                                        Ad templates
                                    </label>
                                </div>
                            </ReflexElement>
                            <ReflexSplitter/>
                            {/* Ad instances */}
                            <ReflexElement>
                                <div style={{ backgroundColor: "yellow"}}>
                                    <label>
                                        Ad instances
                                    </label>
                                </div>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                    <ReflexSplitter/>
                    {/* Right split element for the ad editor */}
                    <ReflexElement>
                        <div style={{ backgroundColor: "red"}}>
                            <label>
                                Ad editor
                            </label>
                        </div>
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </Box>
    );
}

export default App;
