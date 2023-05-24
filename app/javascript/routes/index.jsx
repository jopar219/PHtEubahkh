import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../components/Index";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </Router>
);