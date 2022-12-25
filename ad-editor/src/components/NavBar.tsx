import React from 'react';
import {
    AppBar,
    CssBaseline,
    Icon,
    Toolbar,
    Typography
} from "@mui/material";

const NavBar = () => {
    return (
        <>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <Icon sx={{margin: "8px"}}>
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="Logo"
                             style={{width: "24px", height: "24px"}}/>
                    </Icon>
                    <Typography variant="h6" component="div">
                        Ad Editor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

export default NavBar;