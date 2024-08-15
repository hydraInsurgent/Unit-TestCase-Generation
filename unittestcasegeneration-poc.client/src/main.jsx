import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GenerateUnitTestFromFile from './components/GenerateUnitTestFromFile.jsx'
import GenerateUnitTestFromSnippet from './components/GenerateUnitTestFromSnippet.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <GenerateUnitTestFromFile />
    <GenerateUnitTestFromSnippet />
  </StrictMode>,
)
