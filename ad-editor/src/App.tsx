import React from 'react';
import './App.css';
import {AppBar, Box, CssBaseline, Icon, List, ListItemButton, ListItemText, ListSubheader, Toolbar, Typography} from "@mui/material";
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

function App() {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline/>
            <AppBar style={{ backgroundColor: "#00203fff" }}>
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
                            {/* Ad Templates */}
                            <ReflexElement>
                                <List
                                    sx={{ width: '100%', 'min-width': '100px' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader"
                                                       style={{ padding: "12px 16px", backgroundColor: "#adefD1ff", color: "#00203fff" }}
                                        >
                                            <Typography component="div" variant="h6">
                                                Ad Templates
                                            </Typography>
                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemText primary="First ad template" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary="Second ad template" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary="Third ad template" />
                                    </ListItemButton>
                                    <ListItemButton >
                                        <ListItemText primary="Fourth ad template" />
                                    </ListItemButton>
                                </List>
                            </ReflexElement>
                            <ReflexSplitter/>
                            {/* Ad instances */}
                            <ReflexElement>
                                <List
                                    sx={{ width: '100%', 'min-width': '100px' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader"
                                                       style={{ padding: "12px 16px", backgroundColor: "#adefD1ff", color: "#00203fff" }}
                                        >
                                            <Typography component="div" variant="h6">
                                                Ad Instances
                                            </Typography>
                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemText primary="First ad instance" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary="Second ad instance" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary="Third ad instance" />
                                    </ListItemButton>
                                    <ListItemButton >
                                        <ListItemText primary="Fourth ad instance" />
                                    </ListItemButton>
                                </List>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                    <ReflexSplitter/>
                    {/* Right split element for the ad editor */}
                    <ReflexElement>
                        <div>
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
