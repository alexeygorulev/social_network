import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Application from "./application";
import Layout from "./application/components/Layout/Layout";

function ApplicationWithHandlers() {
  const applicationProps = {
    adminApi: {
      baseUrl: process.env.REACT_APP_API_URL,
      authorizationToken: process.env.REACT_APP_TOKEN,
    },
  };

  return <Application {...applicationProps} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Layout>
      <ApplicationWithHandlers />
    </Layout>
  </BrowserRouter>
);
