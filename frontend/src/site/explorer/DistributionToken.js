import React from 'react';
import './Dashboard.css';

function Dashboard() {
  
    const campaigns = [
      {
        campaign: "Program Air Bersih di Daerah Terdampak",
        amount: "200.000 INFQ24",
        txhash: "X0ka934msal230nasdgi94",
        status: 1, 
        program: "BMHPDK"
      },
      {
        campaign: "Program Bantuan Pendidikan Anak",
        amount: "150.000 INFQ24",
        txhash: "Y2ka934msal230nasdgi95",
        status: 1,
        program: "BMHPDK"
      },
      {
        campaign: "Program Kesehatan Masyarakat dan Sanitasi",
        amount: "67.000 INFQ24",
        txhash: "Z3ka934msal230nasdgi96",
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
            <h3>Distribution BMH Infaq Collection 2024</h3> 
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
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="summary-usage">
            <h3 style={{fontSize: "1.8em",fontWeight:"700"}}>Transactions
            </h3>
            <h4 style={{fontSize: "1.1em",fontWeight:"600"}}>Token BMH Infaq Collection</h4>
            <h4 style={{fontSize: "1em"}}>to</h4>
            <h4 style={{fontSize: "1.1em",fontWeight:"600"}}>BMHPDK</h4>
            <div className="section-header">
                </div>
                    <div className="summary-cards">
                        <div className="summary-card">
                            <h4>Signers</h4>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">x0m3sd9230j23moasdma</li>
                                <li class="list-group-item">x09kn237sam4504madbs</li>
                                <li class="list-group-item">x08ij3sd9230j23moasdma</li>
                            </ul>
                        </div>
                    <div className="summary-card">
                        <h4>Amount</h4>
                        <span>450.000.0000 INFQ2024 </span>
                    </div>
                    <div className="summary-card">
                        <h4>Tanggal Penyaluran</h4>
                        <span>15 Oktober 2024</span>
                        <span>14.20:40 WIB</span>
                    </div>
                
            </div>
        </div>
        </div>
    </div>
  );
};

export default Dashboard;
