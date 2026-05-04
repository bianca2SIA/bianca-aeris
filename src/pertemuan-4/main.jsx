import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";


import WisataSearchFilter from './WisataSearchFilter.jsx'
import WisataAdmin from './WisataAdmin.jsx'

import '../pertemuan-3/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WisataSearchFilter />
    <WisataAdmin />
  </StrictMode>,
)