import "./custom.css";

function Nama() {
  return <p>Nama: Bianca Bahi</p>;
}

function NIM() {
  return <p>NIM: 2457301026</p>;
}

function Prodi() {
  return <p>Prodi: Sistem Informasi</p>;
}

function Tanggal() {
  return <p>Tanggal Lahir: 08 November 2005</p>;
}

function Alamat() {
  return <p>Alamat: Harapan Raya</p>;
}

function Email() {
  return <p>Email: bianca24si@mahasiswa.pcr.ac.id</p>;
}

function Biodata() {
  return (
    <div className="card">
      <h2>Biodata</h2>
      <Nama />
      <NIM />
      <Prodi />
      <Tanggal />
      <Alamat />
      <Email />
    </div>
  );
}

export default Biodata;
