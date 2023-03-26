import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useRouter} from "next/router";
import List from "@mui/material/List";
import DashboardIcon from "../../../icons/DashboardIcon";
import TransactionIcon from "../../../icons/TransactionIcon";

export const MenuItems = () => {
    const router = useRouter()
    const [transactionCollapsed, setTransactionCollapsed] = React.useState(true);



    const handleListTransactionMenuClick = async () => {
        await router.push('/transactions');
    }

    return <React.Fragment>
        <List
            sx={{ width: '100%', maxWidth: 360}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">

                </ListSubheader>
            }
        >
            <ListItemButton style={{padding: 20}}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton style={{padding: 20}} id={'transaction-menu'} onClick={handleListTransactionMenuClick}>
                <ListItemIcon>
                    <TransactionIcon />
                </ListItemIcon>
                <ListItemText primary="Transações" />
            </ListItemButton>
        </List>
    </React.Fragment>
};

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);
