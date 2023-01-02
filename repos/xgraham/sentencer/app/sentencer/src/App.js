import './App.css';
import React from 'react';
import AppBar from "@mui/material/AppBar";
import {TabPanel,a11yProps} from './pages/MyTabs'
import {ConnectionProvider, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {Box, Grid, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {getPhantomWallet, getSolflareWallet} from "@solana/wallet-adapter-wallets";
import PropTypes from 'prop-types';
import AllListings from "./pages/AllListings";
import Mint from "./pages/Mint";
import MySentences from "./pages/MySentences";

require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [getPhantomWallet(),getSolflareWallet()]




TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


MySentences.propTypes = {props: PropTypes.any};

function App() {
    const wallet = useWallet()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };






    return (
        <div className="App">
            <AppBar
            >
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="h4" noWrap component="div">
                                Sentencer
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <WalletMultiButton/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar >
            <body>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">
                <Grid item xs={2}/>
                <Grid item xs={8}
                      style={{marginTop:"92"}}>
                    <div style={{ height:'100%'}}>
                        <Box sx={{width: '100%', marginTop: '65px'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Listed Sentences" {...a11yProps(0)} />
                                    <Tab label="Mint a Sentence" {...a11yProps(1)} />
                                    <Tab label="Your Sentences" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <AllListings wallet={wallet}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Mint wallet={wallet}/>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <MySentences wallet={wallet}/>
                            </TabPanel>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={2}/>

            </Grid>
            </body>

        </div>
    );
}


const AppWithProvider = () => (
    <ConnectionProvider endpoint="http://127.0.0.1:8899">
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <App/>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)

export default AppWithProvider;