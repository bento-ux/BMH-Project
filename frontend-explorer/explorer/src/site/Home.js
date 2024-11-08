import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

function HomeGetAllToken() {
  const [tokenList, setTokenList] = useState([]); // List of tokens and their amounts
  const [programList, setProgramList] = useState([]); // List of programs and their total amounts
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3becc90ef3474ed3dc7dc468f3724f6c.serveo.net/explorer/home"
        );

        console.log("API Response:", response.data); // Debug log

        if (response.data) {
          const { tokenList, programList } = response.data;
          setTokenList(tokenList);
          setProgramList(programList);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

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
        <div className="text-center font-weight-bold pt-3 pb-4">
          <h5 style={{ fontWeight: "600" }}>Welcome to</h5>
          <h3 style={{ fontWeight: "700" }}>iBantu Blockchain Explorer</h3>
        </div>

        <div className="summary-usage">
          <h3>Our Token</h3>
          <div className="section-header"></div>
          <div className="summary-cards">
            {error && <p>Error: {error.message}</p>}
            {tokenList.length > 0 ? (
              tokenList.map((token, index) => (
                <Link
                  to={`/token-umum/${encodeURIComponent(token.tokenName)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="summary-card">
                    <h4>{token.tokenName}</h4>
                    <div className="summary-content">
                      <i className="fas fa-coins icon"></i>
                      <span>{token.total_amount}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="summary-card">
                <div className="summary-content">
                  <span>Belum ada Token Umum</span>
                </div>
              </div>
            )}
          </div>

          {/* TOKEN PROGRAM */}
          <div className="summary-cards mt-3">
            {error && <p>Error: {error.message}</p>}
            {programList.length > 0 ? (
              programList.map((token, index) => (
                <Link
                  to={`/token-program/${encodeURIComponent(token.program)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="summary-card">
                    <h4>{token.program}</h4>
                    <div className="summary-content">
                      <i className="fas fa-coins icon"></i>
                      <span>{token.total_amount}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="summary-card">
                <div className="summary-content">
                  <span>Belum ada Token Program</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGetAllToken;
