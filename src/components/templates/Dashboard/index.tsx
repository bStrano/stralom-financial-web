import * as React from 'react';
import {DashboardContent} from "./DashboardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {Breadcrumbs} from "@mui/material";


export default function Core({children, title, subtitle}) {
    return <DashboardContent title={title} subtitle={subtitle} breadcumbs={
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                MUI
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
    }>{children}</DashboardContent>;
}
