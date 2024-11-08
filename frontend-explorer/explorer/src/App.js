import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from './site/Home';
import TransactionCampaign from './site/TransactionCampaign';
import TokenUmum from './site/TokenUmum';
import TokenUmumDetail from './site/TokenUmumDetail';
import TransactionDistribution from './site/TransactionDistribution';
import TokenProgramDetail from './site/TokenProgramDetail';
import TokenProgram from './site/TokenProgram';

function App() {
  return (
    <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/token-umum/tx/:txHash" element={<TransactionCampaign />} />
              <Route path="/token-umum" element={<TokenUmum />} />
              <Route path="/token-umum/:tokenName" element={<TokenUmumDetail />} />
              <Route path="/token-program/tx/:txHash" element={<TransactionDistribution />} />
              <Route path="/token-program/:tokenName" element={<TokenProgramDetail />} />
              <Route path="/token-program" element={<TokenProgram />} />
            </Routes>
    </Router>
  );
}

export default App;
