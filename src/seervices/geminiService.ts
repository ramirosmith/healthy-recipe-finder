import { Recipe } from "../types";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function fetchRecipes({
  ingredients,
  mealType,
  dietaryPreferences
}: {
  ingredients: string[];
  mealType: string;
  dietaryPreferences: string[];
}): Promise<Recipe[]> {
  const prompt = `
    Generate 3 healthy recipes in JSON format. Each recipe should include:
    title, description, isAIGenerated, prepTime, ingredients (with name and quantity), steps, dietaryInfo, imagePrompt (in English), healthBenefits.
    Consider the following: 
    Ingredients available: ${ingredients.join(', ')}
    Meal type: ${mealType}
    Dietary filters: ${dietaryPreferences.join(', ')}
    Output only valid JSON array matching this TypeScript Recipe type.
  `;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error("Error fetching recipes");
  const data = await res.json();
  // Gemini response parsing may need adjustment
  // Try to extract the JSON array from the response text
  try {
    const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
    return JSON.parse(jsonText);
  } catch {
    return [];
  }
}
