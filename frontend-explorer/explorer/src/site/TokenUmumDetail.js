import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./style.css";

function TokenUmumDetail() {
  const { tokenName } = useParams();
  const [result, setResult] = useState({
    totalAmount: 0,
    currentToken: 0,
    totalDistributed: 0,
  }); // about token
  const [programList, setProgramList] = useState([]); // about distribution
  const [resultCampaigns, setResultCampaigns] = useState([]); // about campaign from laravel
  const [programDataRaw, setProgramDataRow] = useState([]); // raw data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.e-asset.co/explorer/token-umum-detail",
          {
            params: { tokenName },
          }
        );

        console.log("API Response:", response.data); // Debug log

        if (
          response.data &&
          response.data.total &&
          response.data.programs &&
          response.data.programData
        ) {
          const { total, programs, programData } = response.data;

          setResult(total); // Simpan hasil total amount
          setProgramList(programs); // Simpan daftar program

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
        } else {
          setResult({ totalAmount: 0, currentToken: 0, totalDistributed: 0 });
          setProgramList([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [tokenName]);

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
              <Link
                to={`/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <a className="nav-link">Home</a>{" "}
              </Link>
              <Link
                to={`/token-umum`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <a className="nav-link">Token Umum</a>{" "}
              </Link>

              <Link
                to={`/token-program`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <a className="nav-link">Token Distribusi</a>{" "}
              </Link>
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
            <h3>{tokenName}</h3>
            {/* <a href="#">View All</a> */}
          </div>
          <div className="blockchain-list mt-4">
            {error && <p>Error fetching data: {error.message}</p>}
            {programDataRaw && resultCampaigns ? (
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
                      <div className="status">
                        {item.amount} {item.tokenUmumSymbol}
                      </div>
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
              <p>Belum ada campaign</p>
            )}
          </div>
        </div>

        <div className="summary-usage">
          <h3>Circulating Supply</h3>
          <div className="section-header"></div>
          <div className="summary-cards">
            {result ? (
              <>
                <div className="summary-card">
                  <h4>Total Token</h4>
                  <div className="summary-content">
                    <i className="fas fa-coins icon"></i>
                    <span>
                      {result.totalAmount} {result.tokenUmumSymbol}
                    </span>
                  </div>
                </div>
                <div className="summary-card">
                  <h4>Current Token</h4>
                  <div className="summary-content">
                    <i className="fas fa-chart-line icon"></i>
                    <span>
                      {result.currentToken} {result.tokenUmumSymbol}
                    </span>
                  </div>
                </div>
                <div className="summary-card">
                  <h4>Total Distribusi</h4>
                  <div className="summary-content">
                    <i className="fas fa-donate icon"></i>
                    <span>
                      {result.totalDistributed} {result.tokenUmumSymbol}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <div className="quick-links">
          <div className="section-header">
            <h3>Distribution Token</h3>
          </div>
          <ul>
            {programList.length > 0 ? (
              programList.map((program, index) => (
                <>
                  <li>
                    <i className="fas fa-hands-holding-circle"></i>
                    <strong>{program.program}: </strong> &nbsp;
                    {program.programTotalAmount} {result.tokenUmumSymbol}{" "}
                  </li>
                </>
              ))
            ) : (
              <p>Token belum pernah di distribusikan</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TokenUmumDetail;
