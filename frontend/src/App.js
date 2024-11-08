import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeployToken from './site/Deploy';
import MintingMultiSig from './site/MintingMultiSig';


// Explorer
import TransactionCampaign from './site/explorer/TransactionCampaign';
// import TxHashCampaign from './site/explorer/TxHashCampaign';
import TokenUmum from './site/explorer/TokenUmum';
import Dashboard from './site/explorer/Dashboard';
import DistributionToken from './site/explorer/DistributionToken';
import TokenProgram from './site/explorer/TokenProgram';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/deploy" element={<DeployToken />} />
                <Route path="/multi-sig" element={<MintingMultiSig />} />

                {/* <Route path="/token-umum/tx/:txhash" element={<TxHashCampaign />} /> */}
                <Route path="/token-umum/tx/:txhash" element={<TransactionCampaign />} />
                <Route path="/token-umum/:tokenName" element={<TokenUmum />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/token-program/tx/:txhash" element={<DistributionToken />} />

                <Route path="/token-program/:tokenName" element={<TokenProgram />} />

            </Routes>
        </Router>
    );
}

export default App;
