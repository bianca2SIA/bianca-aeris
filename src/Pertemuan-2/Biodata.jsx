import "./custom.css";

function Nama() {
  return (
    <p>
      <span>Nama</span> Bianca Bahi
    </p>
  );
}

function NIM() {
  return (
    <p>
      <span>NIM</span> 2457301026
    </p>
  );
}

function Prodi() {
  return (
    <p>
      <span>Prodi</span> Sistem Informasi
    </p>
  );
}

function Tanggal() {
  return (
    <p>
      <span>Tanggal Lahir</span> 08 November 2005
    </p>
  );
}

function Alamat() {
  return (
    <p>
      <span>Alamat</span> Harapan Raya
    </p>
  );
}

function Email() {
  return (
    <p>
      <span>Email</span> bianca24si@mahasiswa.pcr.ac.id
    </p>
  );
}

function Biodata() {
  return (
    <div className="card">
      <h2>Biodata</h2>

      <Nama/> 
      <NIM />
      <Prodi />
      <Tanggal />
      <Alamat />
      <Email />

      <div className="divider"></div>

      <div className="section-title">Skills</div>

      <div className="skills">
        <div className="skill">HTML</div>
        <div className="skill">CSS</div>
        <div className="skill">JavaScript</div>
        <div className="skill">React</div>
      </div>

      <div className="quote">"Design is intelligence made visible"</div>

      <div className="footer">© 2026 Bianca Portfolio</div>
    </div>
  );
}

export default Biodata;
