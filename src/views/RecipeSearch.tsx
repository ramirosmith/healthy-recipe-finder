import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PANTRY_CATEGORIES, DIETARY_PREFERENCES, MEAL_TYPES } from "../constants";
import { fetchRecipes } from "../services/geminiService";
import { Recipe } from "../types";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetailModal } from "../components/RecipeDetailModal";

export function RecipeSearch() {
  const [pantry] = useLocalStorage("pantry", []);
  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  async function handleSearch() {
    setLoading(true);
    setError("");
    try {
      const result = await fetchRecipes({
        ingredients: pantry.map(i => i.name),
        mealType,
        dietaryPreferences: dietary
      });
      setRecipes(result);
    } catch {
      setError("No se pudieron obtener recetas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(title: string) {
    setFavorites(favorites.includes(title)
      ? favorites.filter(f => f !== title)
      : [...favorites, title]);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sora">
      <h2 className="text-xl font-bold mb-4">Búsqueda de Recetas Saludables</h2>
      <div className="mb-6 flex gap-4 flex-wrap">
        <div>
          <label className="block mb-1 font-semibold">Tipo de comida:</label>
          <select
            value={mealType}
            onChange={e => setMealType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {MEAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Preferencias alimentarias:</label>
          <div className="flex gap-2 flex-wrap">
            {DIETARY_PREFERENCES.map(pref => (
              <button
                key={pref}
                type="button"
                className={`px-3 py-1 rounded border transition ${
                  dietary.includes(pref)
                    ? "bg-emerald-500 text-white border-emerald-600"
                    : "bg-slate-200 text-slate-700 border-slate-300 hover:bg-emerald-100"
                }`}
                onClick={() =>
                  setDietary(dietary =>
                    dietary.includes(pref)
                      ? dietary.filter(p => p !== pref)
                      : [...dietary, pref]
                  )
                }
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition flex items-center gap-2"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading && (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
          )}
          Buscar Recetas
        </button>
      </div>
      {!recipes.length && !loading && !error && (
        <div className="text-slate-500 text-center py-10">
          ¡Bienvenido! Usa el formulario para buscar recetas saludables.
        </div>
      )}
      {loading && (
        <div className="flex justify-center py-10">
          <span className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-emerald-500"></span>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-4">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.title}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.title)}
            onToggleFavorite={() => toggleFavorite(recipe.title)}
            onClick={() => setSelected(recipe)}
          />
        ))}
      </div>
      <RecipeDetailModal recipe={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
