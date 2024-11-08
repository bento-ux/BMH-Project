import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function TokenProgramDetail() {
  const { tokenName } = useParams();
  const [programDataRaw, setProgramDataRow] = useState([]); // Raw data for program
  const [tokenList, setTokenList] = useState([]); // Token list with total amount per token
  const [totalProgramAmount, setTotalProgramAmount] = useState(0); // Total amount for the program
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3becc90ef3474ed3dc7dc468f3724f6c.serveo.net/explorer/token-program-detail",
          {
            params: { tokenName: tokenName }, // Use tokenName as the parameter
          }
        );

        console.log("API Response:", response.data); // Debug log

        if (response.data && response.data.programData) {
          const { programData, tokenList, totalProgramAmount } = response.data;

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
              ...program, // Data dari program
              campaign: campaignResults[index]
                ? campaignResults[index].campaign
                : null, // Ambil campaign jika ada
            };
          });

          setProgramDataRow(combinedData); // Simpan data gabungan ke state
          setTokenList(tokenList); // Simpan tokenList ke state
          setTotalProgramAmount(totalProgramAmount); // Simpan totalProgramAmount ke state
        } else {
          setProgramDataRow([]);
          setTokenList([]);
          setTotalProgramAmount(0);
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
            <h3>Token {tokenName}</h3>
            {/* <a href="#">View All</a> */}
          </div>
          <div className="blockchain-list mt-4">
            {error && <p>Error: {error.message}</p>}
            {programDataRaw && programDataRaw.length > 0 ? (
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
              ))
            ) : (
              <p className="text-center">Belum ada penyaluran campaign</p>
            )}
          </div>
        </div>

        <div className="summary-usage">
          <h3>Origin Token</h3>
          <div className="section-header"></div>

          <div className="summary-cards">
            {console.log(tokenList)}
            {tokenList && tokenList.length > 0 ? (
              tokenList.map((item, index) => (
                <div className="summary-card" key={index}>
                  <span>{item.tokenName}</span>
                  <br />
                  <div className="summary-content">
                    <h4>{item.total_amount}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p>Belum ada penyaluran Token Umum</p>
            )}
          </div>
        </div>

        <div className="text-center border border-light-subtle font-weight-bold pt-3 pb-4">
          <h3 style={{ fontWeight: "600" }}>Total Token</h3>
          {totalProgramAmount ? (
            <h5 style={{ fontWeight: "700" }}>{totalProgramAmount}</h5>
          ) : (
            <h5>Belum ada penyaluran</h5>
          )}
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <h1>Token Program Detail</h1>

//       {error && <p>Error: {error.message}</p>}

//       <h2>Program Data</h2>
//       <pre>{JSON.stringify(programDataRaw, null, 2)}</pre>

//       <h2>Token List</h2>
//       <ul>
//         {tokenList.map((token) => (
//           <li key={token.tokenName}>
//             Token Name: {token.tokenName}, Total Amount: {token.total_amount}
//           </li>
//         ))}
//       </ul>

//       <h2>Total Program Amount</h2>
//       <p>{totalProgramAmount}</p>
//     </div>
//   );
// }

export default TokenProgramDetail;
