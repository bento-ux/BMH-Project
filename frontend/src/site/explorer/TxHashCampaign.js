import { useParams } from 'react-router-dom';

function TransactionDetail() {
  const { txhash } = useParams();

  return (
    <div>
          <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary" data-bs-theme="dark">
            <div class="container-fluid">
              <strong class="navbar-brand" href="#">Blockchain Explorer</strong>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-link active" aria-current="page" href="#">Track</a>
                  <a class="nav-link" href="#">Token Umum</a>
                  <a class="nav-link" href="#">Token Distribusi</a>
                  <a class="nav-link" href="#">About</a>
                </div>
              </div>
            </div>
          </nav>
      <div className="form-wrapper mt-3">
        <h3>Wellcome!</h3>
        <br></br>
        <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card border-secondary mb-3">
      <div className="card-header border-secondary">
        Mint Token: <strong>INFAQ2024</strong>
      </div>
      <div className="card-body">
        <h5 className="card-title">Campaign</h5>
        <p className="card-text">Kekeringan Ekstrem, Cuci Baju Pakai Air Bekas!</p>
      </div>
      <div className="card-footer bg-transparent border-secondary">
        Transaksi Hash: <strong>{txhash}</strong>
      </div>
    </div>
  </div>

  <div className="col">
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Amount:</li>
        <li className="list-group-item">Token:</li>
        <li className="list-group-item">Tanggal Donasi:</li>
      </ul>
    </div>
  </div>
</div>

            <div className='row mt-4'>
              <div className='col-6'>
                <strong>Status</strong><br></br>
                <small>Tersalurkan</small>
              </div>
              <div className='col-6 text-end'>
                  <strong>Token Program </strong><br></br>
                  <small>BMHPDK</small>
              </div>  
            </div>

            <div className='row mt-4'>
              <div className='col-6 col-sm-6'>
                <strong >Transaksi Hash Distribusi</strong><br></br>
                <small><a href='#'>
                {`x0asd3483bk023n23njsadkjndsadn`.slice(0, 6)}...{`x0asd3483bk023n23njsadkjndsadn`.slice(-5)}
                </a>
                </small>
              </div>
              <div className='col-6 col-sm-6 text-end'>
                  <strong>Tanggal Penyaluran </strong><br></br>
                  <small>Jan 23 2019 14:87 WIB</small>
              </div>  
            </div>
              
      </div>
      

    </div>
  );
}

export default TransactionDetail;
