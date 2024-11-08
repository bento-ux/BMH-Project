import React from 'react';
import './Dashboard.css';

function TransactionCampaign() {
  
    const campaigns = [
      {
        campaign: "Program Air Bersih di Daerah Terdampak",
        amount: "Rp 150.000",
        txhash: "X0ka934msal230nasdgi94",
        status: 1, 
        program: "BMHPDK"
      },

    ];
  return (
    <div>
        <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <strong className="navbar-brand" href="#">
            Blockchain Explorer
          </strong>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Track
              </a>
              <a className="nav-link" href="#">
                Token Umum
              </a>
              <a className="nav-link" href="#">
                Token Distribusi
              </a>
              <a className="nav-link" href="#">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

        <div className="dashboard">
        <div className="blockchain-section">
            <div className="section-header">
            <h3>Transaksi Hash: x0jsd8n294lkv048uw5lqnb560f2</h3>
            </div>
            <div className="blockchain-list mt-4">
            {campaigns.map((campaign, index) => (
                <div className="blockchain-item" key={index}>
                <div className="blockchain-column blockchain-column-campaign">
                    <div className="column-label">Campaign</div>
                    <div className="blockchain-title">
                    <i className="fas fa-network-wired"></i>
                    <span>{campaign.campaign}
                    </span>
                    <span className="tag">{campaign.program}</span>
                    </div>
                </div>
                <div className="blockchain-column">
                    <div className="column-label">Amount</div>
                    <div className="stat-item">
                        <i className="fas fa-money-bill-wave"></i>
                        <div className="status">{campaign.amount}</div>
                    </div>
                </div>
                <div className="blockchain-column">
                    <div className="column-label">Token</div>
                    <div className="stat-item">
                        <i className="fas fa-coins"></i>
                        <div className="status">150.000 INFQ24</div>
                    </div>
                </div>
                <div className="blockchain-column">
                    <div className="column-label">Tx Penyaluran</div>
                    <div className="blockchain-stats">
                    <div className="stat-item">
                        <i className="fas fa-link"></i>
                        <span><a href='#'>{campaign.txhash}</a></span>
                    </div>
                    </div>
                </div>
                {/* <div className="blockchain-column">
                    <div className="column-label">Status</div>
                    <div className="blockchain-stats">
                        <div className="stat-item">
                        {campaign.status === 1 ? (
                            <>
                            <i className="fas fa-circle-check"></i> 
                            <span>Tersalurkan</span>
                            </>
                        ) : (
                            <>
                            <i className="fas fa-hourglass-start"></i>
                            <span>Belum Tersalurkan</span>
                            </>
                        )}
                        </div>
                    </div>
                    </div> */}
                </div>
            ))}
            </div>
        </div>

        <div className="summary-usage">
      <h3>Transactions</h3>
      <div className="section-header"></div>
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Status</h4>
          <div className="summary-content">
            <i className="fas fa-circle-check" style={{color: "#4caf50", marginRight:"5px"}}></i>
            <span>Tersalurkan</span>
          </div>
        </div>
        <div className="summary-card">
          <h4>Token Program</h4>
          <div className="summary-content">
            <i className="fas fa-coins" style={{color: "#4caf50", marginRight:"5px"}}></i>
            <span>BMHPDK</span>
          </div>
        </div>
        <div className="summary-card">
          <h4>Tanggal Donasi</h4>
          <div className="summary-content">
            <i className="fas fa-calendar-day" style={{color: "#4caf50", marginRight:"5px"}}></i>
            <span>12 Sept 2024 18.57.03</span>
          </div>
        </div>
        <div className="summary-card">
          <h4>Tanggal Penyaluran</h4>
          <div className="summary-content">
            <i className="fas fa-calendar-check" style={{color: "#4caf50", marginRight:"5px"}}></i>
            <span>28 Sept 2024 09.23.44</span>
          </div>
        </div>
      </div>
    </div>

    
        
        </div>
    </div>
  );
};

export default TransactionCampaign;
