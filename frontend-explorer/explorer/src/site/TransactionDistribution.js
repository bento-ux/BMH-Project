import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./style.css";

function TransactionDistribution() {
  const { txHash } = useParams();

  const [programDataRaw, setProgramDataRow] = useState([]); // raw data
  const [additionalData, setAdditionalData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3becc90ef3474ed3dc7dc468f3724f6c.serveo.net/explorer/distribution-token",
          {
            params: { txHash: txHash },
          }
        );

        console.log("API Response:", response.data); // Debug log

        if (response.data && response.data.programData) {
          const { programData, additionalData } = response.data;

          // Jika data program memiliki invoice_number, ambil data kampanye
          const campaignRequests = programData.map(async (item) => {
            const { invoice_number } = item; // Mengambil invoice_number dari setiap program
            if (invoice_number) {
              try {
                const campaignResponse = await axios.get(
                  `https://uat-pay.bmh.or.id/api/v1/invoice/${invoice_number}`
                );
                return { ...campaignResponse.data, invoice_number };
              } catch (err) {
                console.error(
                  "Error fetching campaign data for invoice:",
                  invoice_number,
                  err
                );
                return null;
              }
            }
            return null;
          });

          const campaignResults = await Promise.all(campaignRequests);

          // Gabungkan programData dengan campaignResults
          const combinedData = programData.map((program, index) => {
            return {
              ...program, // data dari program
              campaign: campaignResults[index]
                ? campaignResults[index].campaign
                : null, // ambil campaign jika ada
            };
          });

          setProgramDataRow(combinedData); // Simpan data gabungan ke state
          setAdditionalData(additionalData);
        } else {
          setProgramDataRow([]);
          setAdditionalData(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [txHash]);

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
              {/* <a className="nav-link active" aria-current="page" href="#">
                Track
              </a> */}
              <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}> <a className="nav-link">
                Home
              </a> </Link>
              <Link to={`/token-umum`} style={{ textDecoration: 'none', color: 'inherit' }}> <a className="nav-link">
                Token Umum
              </a> </Link>
              
              <Link to={`/token-program`} style={{ textDecoration: 'none', color: 'inherit' }}> <a className="nav-link">
                Token Distribusi
              </a> </Link>
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
            <h3  style={{
                  wordBreak: "break-all", // Memaksa pemotongan kata panjang ke baris baru
                  whiteSpace: "normal", // Memastikan teks membungkus ke baris baru
                  fontSize: "1.1em", // Sesuaikan ukuran font
                  lineHeight: "1.5", // Jarak antar baris
                }}>Distribution Hash: {txHash}</h3>
            {/* <a href="#">View All</a> */}
          </div>
          <div className="blockchain-list mt-4">
            {error && <p>Error fetching data: {error.message}</p>}
            {programDataRaw ? (
              programDataRaw.map((item, index) => (
                <div className="blockchain-item" key={index}>
                  <div className="blockchain-column blockchain-column-campaign">
                    <div className="column-label">Campaign</div>
                    <div className="blockchain-title">
                      <i className="fas fa-network-wired"></i>
                      <span>{item.campaign}</span>
                      <span className="tag">{item.program}</span>
                    </div>
                  </div>
                  <div className="blockchain-column">
                    <div className="column-label">Amount</div>
                    <div className="stat-item">
                      <i className="fas fa-coins"></i>
                      <div className="status">{item.amount} {item.program}</div>
                    </div>
                  </div>
                  <div className="blockchain-column">
                    <div className="column-label">Transaksi Hash</div>
                    <div className="blockchain-stats">
                      <div className="stat-item">
                        <i className="fas fa-link"></i>
                        <Link
                          key={index}
                          to={`/token-umum/tx/${encodeURIComponent(
                            item.txhash
                          )}`}
                        >
                          <span>
                            {item.txhash.slice(0, 8)}...
                            {item.txhash.slice(0, 5)}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="blockchain-column">
                    <div className="column-label">Status</div>
                    <div className="blockchain-stats">
                      <div className="stat-item">
                        {item.status === 1 ? (
                          <>
                            <i className="fas fa-circle-check"></i>
                            <span>Sudah Tersalurkan</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-hourglass-start"></i>
                            <span>Belum Disalurkan</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Belum ada penyaluran</p>
            )}
          </div>
        </div>

        {error && <p>Error fetching data: {error.message}</p>}
        {additionalData ? (
          <div className="summary-usage">
            <h3 style={{ fontSize: "2.2em", fontWeight: "700" }}>
              Distribution
            </h3>
            <h3 style={{ fontSize: "1.4em", fontWeight: "600" }}>
              {additionalData.tokenName}
            </h3>
            <h3 style={{ fontSize: "1.2em" }}>to</h3>
            <h3 style={{ fontSize: "1.4em", fontWeight: "600" }}>
              {additionalData.program}
            </h3>
            <div className="section-header"></div>
            <div className="summary-cards">
              <div className="summary-card">
                <h4>Signers</h4>
                <ul class="list-group list-group-flush">
                
                {additionalData.signers ? (
                    JSON.parse(additionalData.signers).map((signer, index) => (
                      <li className="list-group-item" key={index}>
                        {signer.slice(0, 10)}...
                        {signer.slice(signer.length - 10)}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item"> -</li>
                  )}
                </ul>
              </div>
              <div className="summary-card">
                <h4>Amount</h4>
                <span>{additionalData.totalAmount} INFQ2024 </span>
              </div>
              <div className="summary-card">
                <h4>Tanggal Penyaluran</h4>
                <span>{additionalData.lastDistributionDate}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}

export default TransactionDistribution;
