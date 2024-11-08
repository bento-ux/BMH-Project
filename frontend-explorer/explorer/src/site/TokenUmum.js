import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Link } from 'react-router-dom';

function TokenUmum() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Panggil API pertama untuk mendapatkan detail transaksi berdasarkan txHash
        const response = await axios.get(
          "https://3becc90ef3474ed3dc7dc468f3724f6c.serveo.net/explorer/get-all-token-umum"
        );

        setResult(response.data); // Simpan hasil respons dari API pertama
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err); // Simpan error jika terjadi
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
        <div className="summary-usage">
          <h3>Token Umum</h3>
          <div className="section-header"></div>
          <div className="summary-cards">
            {error && <p>Error fetching data: {error.message}</p>}
            {result && result.length > 0 ? (
              result.map((item, index) => (
                <Link 
                key={index} 
                to={`/token-umum/${encodeURIComponent(item.tokenName)}`} 
                style={{ textDecoration: 'none', color: 'inherit' }} // Styling optional untuk menghilangkan underline pada teks
              >
                <div key={index} className="summary-card">
                  <h4>{item.tokenName}</h4>
                  <div className="summary-content">
                    <i className="fas fa-coins icon"></i>
                    <span>{item.totalAmount}</span>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <p>Belum ada Token Umum</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenUmum;
