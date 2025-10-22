
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
    name: "Camisa Preta Streetwear",
    price: 89.90,
    description: "Camisa social premium em algodão egípcio, corte slim fit. Perfeita para ocasiões formais e casuais elegantes.",
    image: "../../assets/img/camisa-1.jpg",
    category: "Oversized Streetwear"
  }
];
