import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { PantryManager } from "./views/PantryManager";
import { RecipeSearch } from "./views/RecipeSearch";

export function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-slate-50 py-6 font-sora">
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/pantry" element={<PantryManager />} />
        </Routes>
      </main>
    </Router>
  );
}
