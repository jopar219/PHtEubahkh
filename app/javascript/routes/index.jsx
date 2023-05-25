import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../components/Index";
import Book from "../components/Book";
import Upload from "../components/Upload";

export default <Router>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/book/:id" element={<Book />} />
    <Route path="/book/new" element={<Upload />} />
  </Routes>
</Router>