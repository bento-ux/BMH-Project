import { useParams } from "react-router-dom";

function TokenUmumDetail() {
  const { tokenName } = useParams();

  const campaigns = [
    {
      tokenName: "INFAQ2024 - Program Air Bersih di Daerah Terdampak",
      amount: "Rp 23.000",
      txhash: "X0ka934msal230nasdgi94",
      status: "Sudah Tersalurkan", // Status bisa "Sudah Tersalurkan" atau "Belum Tersalurkan"
    },
    {
      tokenName: "INFAQ2023 - Program Bantuan Pendidikan Anak",
      amount: "Rp 15.000",
      txhash: "Y2ka934msal230nasdgi95",
      status: "Belum Tersalurkan",
    },
    {
      tokenName: "INFAQ2022 - Program Kesehatan Masyarakat dan Sanitasi",
      amount: "Rp 50.000",
      txhash: "Z3ka934msal230nasdgi96",
      status: "Sudah Tersalurkan",
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

      <div className="form-wrapper mt-3 mb-3">
        <h3>Token: {tokenName}</h3>

        <div className="mt-4">
          <span>Keterangan:</span>
          <div
            className="mt-1"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* Lingkaran indikator "Sudah Tersalurkan" */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                  marginRight: "8px",
                }}
              ></div>
              <small>Tersalurkan</small>
            </div>

            {/* Lingkaran indikator "Belum Tersalurkan" */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  marginRight: "8px",
                }}
              ></div>
              <small>Belum Tersalurkan</small>
            </div>
          </div>
        </div>

        {/* Looping data campaign */}
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="campaign-data"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start", // Mengatur agar kolom-kolom sejajar di atas
              flexWrap: "wrap",
              gap: "20px",
              paddingTop: "10px",
              borderTop: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
              <strong>Campaign</strong>
              <br />
              {campaign.tokenName}
            </div>
            <div style={{ flex: "0 1 150px" }}>
              <strong>Amount</strong>
              <br />
              {campaign.amount}
            </div>
            <div style={{ flex: "0 1 200px" }}>
              <strong>Transaksi Hash</strong>
              <br />
              {campaign.txhash}
            </div>

            <div style={{ flex: "0 1 200px" }}>
              <strong>Status</strong>
              <br />
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: campaign.status === "Sudah Tersalurkan" ? "blue" : "red",
                  marginRight: "8px",
                }}
              ></div>
            </div>
          </div>
        ))}
        <hr></hr>

            <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
                <div class="card">
                    <div className="text-center mt-3">
                        <h6>Total Token</h6>
                        <h4>{tokenName}</h4>
                    </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>
            </div>
            </div>
        {/* batas form class */}
      </div> 
    </div>
  );
}

export default TokenUmumDetail;
