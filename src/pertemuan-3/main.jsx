import { createRoot } from 'react-dom/client'
import TailwindCSS from './tailwindCSS.jsx'
import FormPeminjaman from './FormPeminjaman.jsx'
import { StrictMode } from "react";
import './tailwind.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormPeminjaman />
  </StrictMode>,
)