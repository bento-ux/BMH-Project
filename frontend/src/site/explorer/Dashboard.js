import React from 'react';
import './Dashboard.css';

function Dashboard() {
  
    const campaigns = [
      {
        campaign: "Program Air Bersih di Daerah Terdampak",
        amount: "23.000 INFQ24",
        txhash: "X0ka934msal230nasdgi94",
        status: 1, 
        program: "BMHSOK"
      },
      {
        campaign: "Program Bantuan Pendidikan Anak",
        amount: "15.000 INFQ24",
        txhash: "Y2ka934msal230nasdgi95",
        status: 1,
        program: "BMHPDK"
      },
      {
        campaign: "Program Kesehatan Masyarakat dan Sanitasi",
        amount: "76.000 INFQ24",
        txhash: "Z3ka934msal230nasdgi96",
        status: 0,
        program: "BMHSOK"
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
            <h3>Token BMH Infaq Collection 2024</h3>
            <a href="#">View All</a>
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
                        <i className="fas fa-coins"></i>
                        <div className="status">{campaign.amount}</div>
                    </div>
                </div>
                <div className="blockchain-column">
                    <div className="column-label">Transaksi Hash</div>
                    <div className="blockchain-stats">
                    <div className="stat-item">
                        <i className="fas fa-link"></i>
                        <span>{campaign.txhash}</span>
                    </div>
                    </div>
                </div>
                <div className="blockchain-column">
                    <div className="column-label">Status</div>
                    <div className="blockchain-stats">
                        <div className="stat-item">
                        {campaign.status === 1 ? (
                            <>
                            <i className="fas fa-hourglass-start"></i>
                            <span>Belum Tersalurkan</span>
                            </>
                        ) : (
                            <>
                            <i className="fas fa-circle-check"></i>
                            <span>Tersalurkan</span>
                            </>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="summary-usage">
      <h3>Circulating Supply</h3>
      <div className="section-header"></div>
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Token</h4>
          <div className="summary-content">
            <i className="fas fa-coins icon"></i>
            <span>450.000.0000 INFQ2024</span>
          </div>
        </div>
        <div className="summary-card">
          <h4>Current Token</h4>
          <div className="summary-content">
            <i className="fas fa-chart-line icon"></i>
            <span>450.000.0000 INFQ2024</span>
          </div>
        </div>
        <div className="summary-card">
          <h4>Total Distribusi</h4>
          <div className="summary-content">
            <i className="fas fa-donate icon"></i>
            <span>250.000.0000 INFQ2024</span>
          </div>
        </div>
      </div>
    </div>

        <div className="quick-links">
            <div className="section-header">
            <h3>Distribution Token</h3>
            </div>
            <ul>
            <li><i className="fas fa-hands-holding-circle"></i><strong>BMHSOK: </strong> &nbsp;100.000.000 INFQ2024 </li>
            <li><i className="fas fa-hands-holding-circle"></i><strong>BMHPDK: </strong> &nbsp;245.000.000  INFQ2024</li>
            </ul>
        </div>
        </div>
    </div>
  );
};

export default Dashboard;
