export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camisa Social Classic Black",
    price: 89.90,
    description: "Camisa social premium em algodão egípcio, corte slim fit. Perfeita para ocasiões formais e casuais elegantes.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&auto=format",
    category: "Oversized Streetwear"
  }
];
