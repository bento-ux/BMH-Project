import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

function TransactionCampaign() {
  const { txHash } = useParams();
  const [result, setResult] = useState(null);
  const [resultCampaign, setResultCampaign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Panggil API pertama untuk mendapatkan detail transaksi berdasarkan txHash
        const response = await axios.get(
          "https://3becc90ef3474ed3dc7dc468f3724f6c.serveo.net/explorer/tx-hash-campaign",
          {
            params: { txHash: txHash },
          }
        );

        setResult(response.data); // Simpan hasil respons dari API pertama

        if (response.data.length > 0) {
          const getInvoice = response.data[0].invoice_number;

          // Panggil API kedua untuk mendapatkan detail campaign berdasarkan invoice_number
          const resultCampaignData = await axios.get(
            `https://uat-pay.bmh.or.id/api/v1/invoice/${getInvoice}`
          );

          setResultCampaign(resultCampaignData.data); // Simpan hasil respons dari API kedua
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err); // Simpan error jika terjadi
      }
    };

    fetchData();
  }, [txHash]);

  // const campaigns = [
  //   {
  //     campaign: "Program Air Bersih di Daerah Terdampak",
  //     amount: "Rp 150.000",
  //     txhash: "X0ka934msal230nasdgi94",
  //     status: 1,
  //     program: "BMHPDK",
  //   },
  // ];
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
      {error && <p>Error fetching data: {error.message}</p>}
      {result && resultCampaign ? (
        <div className="dashboard">
          <div className="blockchain-section">
            <div className="section-header">
              <h3
                style={{
                  wordBreak: "break-all", // Memaksa pemotongan kata panjang ke baris baru
                  whiteSpace: "normal", // Memastikan teks membungkus ke baris baru
                  fontSize: "1.1em", // Sesuaikan ukuran font
                  lineHeight: "1.5", // Jarak antar baris
                }}
              >
                Transaksi Hash: {txHash}
              </h3>
            </div>
            <div className="blockchain-list mt-4">
              <div className="blockchain-item">
                <div className="blockchain-column blockchain-column-campaign">
                  <div className="column-label">Campaign</div>
                  <div className="blockchain-title">
                    <i className="fas fa-network-wired"></i>
                    <span>{resultCampaign.campaign}</span>
                    <span className="tag">{result[0].program}</span>
                  </div>
                </div>
                <div className="blockchain-column">
                  <div className="column-label">Amount</div>
                  <div className="stat-item">
                    <i className="fas fa-money-bill-wave"></i>
                    <div className="status"> Rp {resultCampaign.amount}</div>
                  </div>
                </div>
                <div className="blockchain-column">
                  <div className="column-label">Token</div>
                  <div className="stat-item">
                    <i className="fas fa-coins"></i>
                    <div className="status">{result[0].amount} {result[0].tokenUmumSymbol}</div>
                  </div>
                </div>
                <div className="blockchain-column">
                  <div className="column-label">Tx Penyaluran</div>
                  <div className="blockchain-stats">
                    <div className="stat-item">
                      <i className="fas fa-link"></i>
                      {result[0].status === 1 ? (
                        <div>
                          <Link 
                to={`/token-program/tx/${encodeURIComponent(result[0].txhashtokenprogram)}`} 
               >
                          <span>
                          {result[0].txhashtokenprogram.slice(0, 8)}...
                          {result[0].txhashtokenprogram.slice(0, 6)}
                          </span>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <span>-</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="summary-usage">
            <h3>Transactions</h3>
            <div className="section-header"></div>
            <div className="summary-cards">
              <div className="summary-card">
                <h4>Status</h4>
                <div className="summary-content">
                  {result[0].status === 1 ? (
                    <div>
                      <i
                        className="fas fa-circle-check"
                        style={{ color: "#4caf50", marginRight: "5px" }}
                      ></i>
                      <span>Tersalurkan</span>
                    </div>
                  ) : (
                    <div>
                      <i
                        className="fas fa-hourglass-start"
                        style={{ color: "#f44336", marginRight: "5px" }}
                      ></i>
                      <span>Belum Disalurkan</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="summary-card">
                <h4>Token Program</h4>
                <div className="summary-content">
                  <i
                    className="fas fa-coins"
                    style={{ color: "#4caf50", marginRight: "5px" }}
                  ></i>
                  <span>{result[0].program}</span>
                </div>
              </div>
              <div className="summary-card">
                <h4>Tanggal Donasi</h4>
                <div className="summary-content">
                  <i
                    className="fas fa-calendar-day"
                    style={{ color: "#4caf50", marginRight: "5px" }}
                  ></i>
                  <span>{resultCampaign.donate_at}</span>
                </div>
              </div>
              <div className="summary-card">
                <h4>Tanggal Penyaluran</h4>
                <div className="summary-content">
                  {result[0].status === 1 ? (
                    <div>
                      <i
                        className="fas fa-calendar-check"
                        style={{ color: "#4caf50", marginRight: "5px" }}
                      ></i>
                      <span>{result[0].tglDisalurkan}</span>
                    </div>
                  ) : (
                    <div>
                      <i
                        className="fas fa-calendar-check"
                        style={{ color: "#f44336", marginRight: "5px" }}
                      ></i>
                      <span>Belum Disalurkan</span>
                    </div>
                  )}
                  {/* <i
                    className="fas fa-calendar-check"
                    style={{ color: "#4caf50", marginRight: "5px" }}
                  ></i>
                  <span>28 Sept 2024 09.23.44</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TransactionCampaign;
