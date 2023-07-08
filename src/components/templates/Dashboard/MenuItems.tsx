import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {useRouter} from "next/router";
import List from "@mui/material/List";
import DashboardIcon from "../../../icons/DashboardIcon";
import TransactionIcon from "../../../icons/TransactionIcon";
import InvestmentIcon from 'src/icons/InvestmentIcon';
import {useTheme} from "@mui/material/styles";


interface MenuItemsProps {
    mobile?: boolean
}

export const MenuItems = ({mobile}: MenuItemsProps) => {
    const theme = useTheme();
    const router = useRouter()
    const [transactionCollapsed, setTransactionCollapsed] = React.useState(true);


    const handleListTransactionMenuClick = async () => {
        await router.push('/transactions');
    }

    const handleListInvestmentsMenuClick = async () => {
        await router.push('/investments');
    }

    const handleEquityDashboardMenuClick = async () => {
        await router.push('/equity/statistics');
    }

    const handleDashboardMenuClick = async () => {
        await router.push('/');
    }

    if (mobile) {
        return (
            <List
                sx={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.background.paper
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton style={{padding: 20}} id={'dashboard-menu'} onClick={handleDashboardMenuClick}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton style={{padding: 20}} id={'equity-dashboard-menu'}
                                onClick={handleEquityDashboardMenuClick}>
                    <ListItemIcon>
                        <TransactionIcon/>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton style={{padding: 20}} id={'transaction-menu'} onClick={handleListTransactionMenuClick}>
                    <ListItemIcon>
                        <TransactionIcon/>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton style={{padding: 20}} id={'investments-menu'} onClick={handleListInvestmentsMenuClick}>
                    <ListItemIcon>
                        <InvestmentIcon/>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        )
    }

    return <React.Fragment>
        <List
            sx={{width: '100%', maxWidth: 360, flexDirection: 'row', display: 'flex'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">

                </ListSubheader>
            }
        >
            <ListItemButton style={{padding: 20}} id={'dashboard-menu'} onClick={handleDashboardMenuClick}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItemButton>
            <ListItemButton style={{padding: 20}} id={'equity-dashboard-menu'} onClick={handleEquityDashboardMenuClick}>
                <ListItemIcon>
                    <TransactionIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard Patrimonio"/>
            </ListItemButton>
            <ListItemButton style={{padding: 20}} id={'transaction-menu'} onClick={handleListTransactionMenuClick}>
                <ListItemIcon>
                    <TransactionIcon/>
                </ListItemIcon>
                <ListItemText primary="Transações"/>
            </ListItemButton>
            <ListItemButton style={{padding: 20}} id={'investments-menu'} onClick={handleListInvestmentsMenuClick}>
                <ListItemIcon>
                    <InvestmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Investimentos"/>
            </ListItemButton>
        </List>
    </React.Fragment>
};

