import React from "react";
import { Recipe } from "../types";
import { FaStar, FaRobot } from "react-icons/fa";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer flex flex-col"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${recipe.title}`}
    >
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(recipe.imagePrompt)}/400/200`}
        alt={recipe.title}
        className="rounded-t-lg object-cover h-40 w-full"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sora">{recipe.title}</h2>
          <p className="text-slate-600 mb-2">{recipe.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-600 font-semibold">{recipe.prepTime}</span>
            {recipe.isAIGenerated && <FaRobot className="text-slate-500" title="Receta generada por IA" />}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className={`text-xl ${isFavorite ? "text-emerald-500" : "text-slate-400"} hover:text-emerald-700 transition`}
            onClick={e => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label={isFavorite ? "Quitar de favoritos" : "Marcar como favorita"}
          >
            <FaStar />
          </button>
        </div>
      </div>
    </div>
  );
}
