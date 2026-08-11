import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";

export function parseAIQuery(query: string) {
  const lowerQuery = query.toLowerCase();

  // Extract budget if mentioned (e.g. "under 40000", "under 40k", "under 90000")
  let budget = 0;
  const budgetMatch = lowerQuery.match(/under\s*(?:₹|rs\.?)?\s*(\d+)(k?)/);
  if (budgetMatch) {
    budget = parseInt(budgetMatch[1], 10);
    if (budgetMatch[2] === 'k' || budget < 1000) budget *= 1000;
  }

  // Extract Category
  let category = "";
  if (lowerQuery.includes("laptop") || lowerQuery.includes("macbook") || lowerQuery.includes("computer")) {
    category = "laptops";
  } else if (lowerQuery.includes("ac") || lowerQuery.includes("air conditioner")) {
    category = "acs";
  } else if (lowerQuery.includes("tv") || lowerQuery.includes("television")) {
    category = "tvs";
  } else if (lowerQuery.includes("refrigerator") || lowerQuery.includes("fridge")) {
    category = "refrigerators";
  } else if (lowerQuery.includes("washing machine") || lowerQuery.includes("washer")) {
    category = "washing-machines";
  } else if (lowerQuery.includes("phone") || lowerQuery.includes("mobile")) {
    category = "mobiles";
  } else if (lowerQuery.includes("purifier") || lowerQuery.includes("air purifier") || lowerQuery.includes("dyson")) {
    category = "air-purifiers";
  } else if (lowerQuery.includes("headphone") || lowerQuery.includes("earphone") || lowerQuery.includes("sony") || lowerQuery.includes("audio")) {
    category = "headphones";
  } else if (lowerQuery.includes("microwave") || lowerQuery.includes("oven") || lowerQuery.includes("ifb")) {
    category = "microwaves";
  }

  return { budget, category };
}

export function getDynamicRecommendations(query: string): Product[] {
  const { budget, category } = parseAIQuery(query);

  let matches = [...PRODUCTS];

  // 1. Strictly filter by category if category is detected
  if (category) {
    const categoryMatches = matches.filter(
      (p) => p.category === category || (category === "air-conditioners" && p.category === "acs")
    );
    if (categoryMatches.length > 0) {
      matches = categoryMatches;
    }
  } else {
    // General keyword match across name & brand
    const words = query.toLowerCase().split(" ").filter((w) => w.length > 2);
    const keywordMatches = matches.filter((p) =>
      words.some(
        (w) =>
          p.name.toLowerCase().includes(w) ||
          p.brand.toLowerCase().includes(w) ||
          p.category.includes(w)
      )
    );
    if (keywordMatches.length > 0) {
      matches = keywordMatches;
    }
  }

  // 2. Filter or rank by budget if user specified one
  if (budget > 0) {
    const withinBudget = matches.filter((p) => p.price <= budget);
    if (withinBudget.length > 0) {
      matches = withinBudget;
    }
  }

  // 3. Customize AI match reasons for the matched products
  return matches.map((product, index) => {
    const customReason = category
      ? `Matches your request for a ${category.replace('-', ' ')}.`
      : `Matched based on your search "${query}".`;

    const existingWhy = Array.isArray(product.aiMatch.whyMatches)
      ? product.aiMatch.whyMatches.slice(1)
      : [product.aiMatch.whyMatches];

    return {
      ...product,
      aiMatch: {
        ...product.aiMatch,
        score: Math.max(85, 96 - index * 3),
        whyMatches: [customReason, ...existingWhy],
      },
    };
  });
}
