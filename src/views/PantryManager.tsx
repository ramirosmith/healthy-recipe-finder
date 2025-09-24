import React, { useState } from "react";
import { Ingredient } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PANTRY_CATEGORIES, COMMON_INGREDIENTS } from "../constants";

export function PantryManager() {
  const [ingredients, setIngredients] = useLocalStorage<Ingredient[]>("pantry", []);
  const [search, setSearch] = useState("");
  const [newIng, setNewIng] = useState({ name: "", category: PANTRY_CATEGORIES[0] });

  function addIngredient() {
    if (!newIng.name.trim()) return;
    setIngredients([...ingredients, { ...newIng }]);
    setNewIng({ name: "", category: PANTRY_CATEGORIES[0] });
  }

  function removeIngredient(name: string) {
    setIngredients(ingredients.filter(i => i.name !== name));
  }

  function addSuggestion(ing: Ingredient) {
    if (!ingredients.some(i => i.name === ing.name)) {
      setIngredients([...ingredients, ing]);
    }
  }

  const filtered = ingredients.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4 font-sora">
      <h2 className="text-xl font-bold mb-4">Gestión de Despensa</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre ingrediente"
          value={newIng.name}
          onChange={e => setNewIng(s => ({ ...s, name: e.target.value }))}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={newIng.category}
          onChange={e => setNewIng(s => ({ ...s, category: e.target.value }))}
          className="border rounded px-2"
        >
          {PANTRY_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={addIngredient}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          Añadir
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar ingrediente"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
      />
      <div className="mb-4">
        <strong>Sugerencias rápidas:</strong>
        <div className="flex gap-2 mt-2 flex-wrap">
          {COMMON_INGREDIENTS.map(ing => (
            <button
              key={ing.name}
              type="button"
              className="bg-slate-200 px-3 py-1 rounded hover:bg-emerald-100 transition"
              onClick={() => addSuggestion(ing)}
            >
              {ing.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        {PANTRY_CATEGORIES.map(cat => (
          <div key={cat} className="mb-3">
            <h3 className="text-lg font-semibold text-slate-700">{cat}</h3>
            <ul>
              {filtered.filter(i => i.category === cat).map(i => (
                <li key={i.name} className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-100">
                  <span>{i.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeIngredient(i.name)}
                    aria-label={`Eliminar ${i.name}`}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
