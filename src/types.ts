export interface Ingredient {
  name: string;
  category: string;
}

export interface Recipe {
  title: string;
  description: string;
  isAIGenerated: boolean;
  prepTime: string;
  ingredients: { name: string; quantity: string; }[];
  steps: string[];
  dietaryInfo: string;
  imagePrompt: string; // En inglés, para el generador de imágenes
  healthBenefits: string;
}

export interface UserProfile {
  favorites: string[];
  history: Recipe[];
}
