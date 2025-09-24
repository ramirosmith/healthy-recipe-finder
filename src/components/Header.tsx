import React from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Búsqueda de Recetas" },
  { to: "/pantry", label: "Gestión de Despensa" }
];

export function Header() {
  const location = useLocation();
  return (
    <header className="bg-slate-100 shadow flex items-center justify-between p-4 font-sora">
      <h1 className="text-2xl text-emerald-600 font-bold">Healthy Recipe Finder</h1>
      <nav className="flex gap-6">
        {NAV_LINKS.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`transition-colors px-2 py-1 rounded ${
              location.pathname === link.to
                ? "bg-emerald-100 text-emerald-600 font-semibold"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
