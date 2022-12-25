import React from 'react';
import './App.css';
import {Box} from "@mui/material";
import NavBar from "./components/NavBar";
import DialogContainer from "./components/dialogs/DialogContainer";
import HomeScreen from "./components/screens/HomeScreen";

function App() {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <NavBar />
            <DialogContainer />
            <Box flex={1}>
                <HomeScreen />
            </Box>
        </Box>
    );
}

export default App;
