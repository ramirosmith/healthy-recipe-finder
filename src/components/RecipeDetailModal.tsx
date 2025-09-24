import React, { useEffect } from "react";
import { Recipe } from "../types";

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

export function RecipeDetailModal({ recipe, onClose }: Props) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-slate-500 hover:text-emerald-600 transition text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(recipe.imagePrompt)}/600/300`}
          alt={recipe.title}
          className="rounded w-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 font-sora">{recipe.title}</h2>
        <p className="mb-2">{recipe.description}</p>
        <div className="mb-2">
          <strong>Tiempo de preparación:</strong> {recipe.prepTime}
        </div>
        <div className="mb-2">
          <strong>Información dietética:</strong> {recipe.dietaryInfo}
        </div>
        <div className="mb-2">
          <strong>Beneficios para la salud:</strong> {recipe.healthBenefits}
        </div>
        <div className="mb-2">
          <strong>Ingredientes:</strong>
          <ul className="list-disc ml-6">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing.name} - {ing.quantity}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Pasos de preparación:</strong>
          <ol className="list-decimal ml-6">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
