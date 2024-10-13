import React from 'react'; // Import React
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App.jsx'; // Import your main App component
import './index.css'; // Import global styles
import Context from './Context/Context.jsx';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.bubble.css';
import "react-tagsinput/react-tagsinput.css";

const rootElement = document.getElementById("root"); // Get the root element
const root = createRoot(rootElement); // Use createRoot to create the React root

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
