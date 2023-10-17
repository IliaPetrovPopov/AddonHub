import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
    options={{
      'clientId': 
        "AQGWMWK28CoPqAkXJ9FZKpgbHRKzYX1qYA3ah8KLnPocHRSfnPgkO_N-dkW-vQFl7C75Un7HOwMxbh_V",
      
    }}
    >
      <BrowserRouter>
        <App />
        <ToastContainer position="top-center" autoClose="1500" />
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);
