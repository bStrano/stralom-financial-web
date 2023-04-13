import * as React from "react";
import {useCallback, useEffect} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {MenuItems} from "./MenuItems";
import Container from "@mui/material/Container";
import {Drawer} from "./Drawer";
import {AppBar} from "./AppBar";
import {Breadcrumbs} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles";
import {useSessionContext} from "../../../providers/SessionProvider";


interface DashboardContentProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    topContent?: React.ReactNode;
}

export function DashboardContent({children, title, subtitle, topContent}: DashboardContentProps) {
    const theme = useTheme();
    const sessionContext = useSessionContext();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        if (!matches && open) {
            setOpen(false)
        }
    }, [matches, open])

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const logout = useCallback(async () => {
        await sessionContext.logout()
    }, [sessionContext])

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    {
                        matches && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && {display: 'none'}),
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                        )
                    }

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        {title}
                    </Typography>
                    <IconButton color="inherit" onClick={logout}>
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List component="nav">
                    <MenuItems/>
                    <Divider sx={{my: 1}}/>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container style={{minWidth: '100%', marginTop: 20}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        {topContent}
                    </Breadcrumbs>
                    <Typography variant={"h5"}>{title}</Typography>
                    <Typography variant={"subtitle1"} style={{paddingBottom: 10}}>{subtitle}</Typography>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
